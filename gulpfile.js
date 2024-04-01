import gulp from "gulp";
import insert from "gulp-insert";
import through from "through2";
import {rollup} from "rollup";
import {deleteAsync} from "del";
import rollupConfig from "./rollup.config.js";
import { promises as fs } from "fs";
import * as path from "path";

const outDir = "build";
const typesDir = "types";
const outName = "turbodombuilder";

let typedefs = "";

const libraryPath = "./src";
const outputPath = path.join("./src", "index.ts");

async function processDirectory(dirPath) {
    let indexContent = "";
    const files = await fs.readdir(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const relativePath = path.relative("./src", fullPath).replace(/\.ts$/, "")
            .replace(/\\/g, "/");

        if ((await fs.stat(fullPath)).isDirectory()) {
            indexContent += await processDirectory(fullPath);
        } else if (file.endsWith(".ts") && !file.endsWith(".d.ts") && file !== "index.ts") {
            const fileContent = await fs.readFile(fullPath, "utf8");
            const exportLines = fileContent.split("\n").filter(line => line.startsWith("export {"));

            for (const exportLine of exportLines) {
                const exportContent = exportLine.match(/export {(.*)}/)[1];
                indexContent += `import {${exportContent}} from "./${relativePath}";\n`;
                indexContent += `export {${exportContent}};\n`;
            }
        }
    }

    return indexContent;
}

async function createIndexFile() {
    const indexContent = await processDirectory(libraryPath);
    await fs.writeFile(outputPath, indexContent.trim());
}

async function rollupBuild() {
    for (const config of rollupConfig) {
        const bundle = await rollup(config);
        await Promise.all(config.output.map(output => bundle.write(output)));
    }
}

function getTypedefs() {
    return gulp.src(outDir + "/" + outName + ".d.ts")
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
function addTypedefsEsm() {
    return gulp.src(outDir + "/" + outName + ".esm.js")
        .pipe(insert.prepend(typedefs))
        .pipe(gulp.dest(outDir));
}

function addTypedefsCjs() {
    return gulp.src(outDir + "/" + outName + ".cjs.js")
        .pipe(insert.prepend(typedefs))
        .pipe(gulp.dest(outDir));
}

function addTypedefsUmd() {
    return gulp.src(outDir + "/" + outName + ".js")
        .pipe(insert.prepend(typedefs))
        .pipe(gulp.dest(outDir));
}

//Delete the temp file
async function clean() {
    await deleteAsync([`${outDir}/${typesDir}`]);
}

//Chain tasks under "gulp build"
gulp.task("build", gulp.series(createIndexFile, rollupBuild, getTypedefs, addTypedefsEsm, addTypedefsCjs, addTypedefsUmd, clean));