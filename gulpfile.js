const gulp = require("gulp");
const ts = require("gulp-typescript");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const insert = require("gulp-insert");
const fs = require("fs");
const through = require("through2");

const excludedFiles = ["!src/transition.ts"];

const tempFilePath = "index.ts";

const umdOutDir = "dist";
const esmOutDir = "esm";
const cjsOutDir = "cjs";

const umdOutFilePath = umdOutDir + "/turbodombuilder.js";
const esmOutFilePath = esmOutDir + "/index.js";
const cjsOutFilePath = cjsOutDir + "/index.js";

let typedefs = "";

//CommonJS TS Config
const cjsTsConfig = {
    target: "ES2015",
    module: "commonjs",
    lib: ["DOM"],
    esModuleInterop: true,
    declaration: true,
    skipLibCheck: true,
    outDir: esmOutDir,
};

//ES Modules TS config
const esmTsConfig = {
    target: "ES2015",
    module: "ES2015",
    lib: ["DOM", "ES2015"],
    esModuleInterop: true,
    declaration: true,
    skipLibCheck: true,
    outDir: esmOutDir,
};

//Combine TypeScript files from "turbo" directory (the core) into the temp file
function combineTurboFiles() {
    return gulp.src(["src/turbo/**/*.ts", ...excludedFiles])
        .pipe(concat(tempFilePath))
        .pipe(gulp.dest("."));
}

//Append the rest of the source code to the temp file
function combineOtherFiles() {
    return gulp.src(["src/**/*.ts", "!src/turbo/**/*.ts", ...excludedFiles])
        .pipe(through.obj(function(file, enc, cb) {
            if (file.isBuffer()) {
                fs.appendFileSync(tempFilePath, "\n" + file.contents.toString());
            }
            cb();
        }));
}

//Remove all import statements from the temp file
function removeImports() {
    return gulp.src(tempFilePath)
        .pipe(replace(/^\s*import\s+((.|\s)+?);/gm, ""))
        .pipe(gulp.dest("."));
}

//Get JSDocs types from the TS temp file into a variable and convert them to typedefs
function getTypedefs() {
    return gulp.src(tempFilePath)
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
        }));
}

//Compile the TypeScript file as ESM
function compileEsmTemp() {
    return gulp.src(tempFilePath)
        .pipe(ts(esmTsConfig))
        .pipe(insert.prepend(typedefs))
        .pipe(gulp.dest(esmOutDir));
}

//Compile the TypeScript file as CommonJS
function compileCjsTemp() {
    return gulp.src(tempFilePath)
        .pipe(ts(cjsTsConfig))
        .pipe(insert.prepend(typedefs))
        .pipe(gulp.dest(cjsOutDir));
}

//Generate a UMD script without exports
function generateUmdFile() {
    return gulp.src(esmOutFilePath)
        .pipe(replace(/^\s*export\s+((.|\s)+?);/gm, ""))
        .pipe(replace(/^\s*export /gm, " "))
        .pipe(concat(umdOutFilePath))
        .pipe(gulp.dest("."));
}

//Minify the ESM compiled code
function minifyEsm() {
    return gulp.src(esmOutFilePath)
        .pipe(terser())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(esmOutDir));
}

//Minify the CommonJS compiled code
function minifyCjs() {
    return gulp.src(cjsOutFilePath)
        .pipe(terser())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(cjsOutDir));
}

//Minify the UMD script
function minifyUmd() {
    return gulp.src(umdOutFilePath)
        .pipe(terser())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(umdOutDir));
}

//Delete the temp file
async function clean() {
    await fs.promises.unlink(tempFilePath);
}

//Chain tasks under "gulp build"
gulp.task("build", gulp.series(combineTurboFiles, combineOtherFiles, removeImports, getTypedefs,
    compileEsmTemp, compileCjsTemp, generateUmdFile, minifyEsm, minifyCjs, minifyUmd, clean));