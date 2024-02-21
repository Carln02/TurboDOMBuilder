const gulp = require("gulp");
const ts = require("gulp-typescript");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const fs = require("fs");

const tempFilePath = "temp.ts";
const outDir = "dist";
const outFilePath = outDir + "/turbodombuilder.js"


//TypeScript configuration
const tsConfig = {
    target: "ES6",
    strict: true,
    esModuleInterop: true,
    declaration: true,
    skipLibCheck: true,
    outFile: outFilePath,
}

//Combine TypeScript files
function combineFiles() {
    return gulp.src("src" + "/**/*.ts")
        .pipe(replace(/^\s*import .+;$\s*/gm, ""))
        .pipe(replace(/^\s*export .+;$\s*/gm, ""))
        .pipe(replace(/^\s*export /gm, " "))
        .pipe(concat(tempFilePath))
        .pipe(gulp.dest('.'));
}

//Compile TypeScript temp file into JavaScript (+ declaration)
function compile() {
    return gulp.src(tempFilePath)
        .pipe(ts(tsConfig))
        .pipe(gulp.dest("."));
}

//Delete the temp file
async function clean() {
    await fs.promises.unlink(tempFilePath);
}

//Minify code
function minify() {
    return gulp.src(outFilePath)
        .pipe(terser())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(outDir));
}

//Chain tasks under "gulp build"
gulp.task("build", gulp.series(combineFiles, compile, clean, minify));