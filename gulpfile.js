const gulp = require("gulp");
const ts = require("gulp-typescript");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const fs = require("fs");

const staticOutDir = "dist";
const moduleOutDir = "module";

const staticTempFilePath = "temp.ts";
const moduleTempFilePath = "index.ts";

const outFilePath = staticOutDir + "/turbodombuilder.js";

const excludedFiles = ["!src/transition.ts"];

//TypeScript configurations
const tsConfig = {
    target: "ES6",
    strict: true,
    esModuleInterop: true,
    declaration: true,
    skipLibCheck: true,
    outFile: outFilePath,
};

//Modules TS config
const modulesTsConfig = {
    target: "ES6",
    strict: true,
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

//Delete the temp file
async function clean() {
    await fs.promises.unlink(staticTempFilePath);
    await fs.promises.unlink(moduleTempFilePath);
}

//Minify code
function minify() {
    return gulp.src(outFilePath)
        .pipe(terser())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(staticOutDir));
}

//Chain tasks under "gulp build"
gulp.task("build", gulp.series(combineFilesWithoutImports, generateTempWithoutExports,
    compileStaticTemp, compileModuleTemp, clean, minify));