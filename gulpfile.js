const gulp = require("gulp");
const ts = require("gulp-typescript");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const insert = require("gulp-insert");
const fs = require("fs");
const through = require("through2");

const staticOutDir = "dist";
const moduleOutDir = "module";

const staticTempFilePath = "temp.ts";
const moduleTempFilePath = "index.ts";

const staticOutFilePath = staticOutDir + "/turbodombuilder.js";
const staticDefFilePath = staticOutDir + "/turbodombuilder.d.ts";

const moduleOutFilePath = moduleOutDir + "/index.js";

const excludedFiles = ["!src/transition.ts"];

//TypeScript configurations
const tsConfig = {
    target: "ES6",
    esModuleInterop: true,
    declaration: true,
    skipLibCheck: true,
    outFile: staticOutFilePath,
};

//Modules TS config
const modulesTsConfig = {
    target: "ES6",
    esModuleInterop: true,
    declaration: true,
    skipLibCheck: true,
    outDir: moduleOutDir,
};

//Combine TypeScript files into a second temp file, but with exports
function combineFilesWithoutImports() {
    return gulp.src(["src/**/*.ts", ...excludedFiles])
        .pipe(replace(/^\s*import .+;$\s*/gm, ""))
        .pipe(concat(moduleTempFilePath))
        .pipe(gulp.dest("."));
}

//Create a second temp file without imports and exports
function generateTempWithoutExports() {
    return gulp.src(moduleTempFilePath)
        .pipe(replace(/^\s*export .+;$\s*/gm, ""))
        .pipe(replace(/^\s*export /gm, " "))
        .pipe(concat(staticTempFilePath))
        .pipe(gulp.dest("."));
}

//Compile the export-less TypeScript temp file into JavaScript (+ declaration)
function compileStaticTemp() {
    return gulp.src(staticTempFilePath)
        .pipe(ts(tsConfig))
        .pipe(gulp.dest("."));
}

//Compile the other TypeScript file
function compileModuleTemp() {
    return gulp.src(moduleTempFilePath)
        .pipe(ts(modulesTsConfig))
        .pipe(gulp.dest(moduleOutDir));
}

//Copy (and update to typedefs) JSDocs types from TS declaration files to JS
function copyTypedefsToJS() {
    let typedefs = "";

    //Extract typedef comments from .d.ts file
    return gulp.src(staticDefFilePath)
        .pipe(through.obj((file, enc, cb) => {
            const contents = file.contents.toString();
            const typeDocRegex = /\/\*\*\s+\*\s+@type {[^}]+}[\s\S]+?\*\//gm;
            let match;
            while ((match = typeDocRegex.exec(contents)) !== null) {
                let docEntry = match[0];
                docEntry = docEntry.replace(/@type {([^}]+)}/, "@typedef {Object} $1");
                typedefs += docEntry + "\n\n";
            }
            cb(null, file);
        }))
        .on("end", () => {
            if (typedefs) {
                gulp.src(staticOutFilePath)
                    .pipe(insert.prepend(typedefs))
                    .pipe(gulp.dest(staticOutDir));

                gulp.src(moduleOutFilePath)
                    .pipe(insert.prepend(typedefs))
                    .pipe(gulp.dest(moduleOutDir));
            }
        });
}

//Delete the temp file
async function clean() {
    await fs.promises.unlink(staticTempFilePath);
    await fs.promises.unlink(moduleTempFilePath);
}

//Minify code
function minify() {
    return gulp.src(staticOutFilePath)
        .pipe(terser())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(staticOutDir));
}

//Chain tasks under "gulp build"
gulp.task("build", gulp.series(combineFilesWithoutImports, generateTempWithoutExports,
    compileStaticTemp, compileModuleTemp, copyTypedefsToJS, clean, minify));