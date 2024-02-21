const gulp = require("gulp");
const ts = require("gulp-typescript");
const webpack = require("webpack-stream");
const TerserPlugin = require("terser-webpack-plugin");
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const path = require("path");
const fs = require("fs");

const tempFilePath = "temp.ts";

//Webpack configuration (for minified file)
const webpackConfig = {
    mode: "development",
    entry: "./dist/turbodombuilder.js",
    output: {
        filename: "turbodombuilder.min.js"
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {},
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};

//TypeScript configuration
const tsConfig = {
    target: "ES6",
    strict: true,
    esModuleInterop: true,
    declaration: true,
    skipLibCheck: true,
    outFile: "turbodombuilder.js",
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
        .pipe(gulp.dest("dist"));
}

//Delete the temp file
async function clean() {
    await fs.promises.unlink(tempFilePath);
}

//Minify (using webpack)
function minify() {
    return gulp.src(webpackConfig.entry)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest("dist"));
}

//Chain tasks under "gulp build"
gulp.task("build", gulp.series(combineFiles, compile, clean, minify));