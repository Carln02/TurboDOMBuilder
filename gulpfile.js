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
            const lines = fileContent.split("\n");
            let exportLines = [];
            let capturing = false;
            let buffer = "";

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith("export {")) capturing = true;

                if (capturing) {
                    buffer += trimmedLine;
                    if (trimmedLine.endsWith("}") || trimmedLine.endsWith("};")) {
                        exportLines.push(buffer);
                        buffer = "";
                        capturing = false;
                    }
                }
            }

            for (const exportLine of exportLines) {
                const match = exportLine.match(/export\s*{\s*([^}]*)\s*}/);
                if (match) {
                    const exportContent = match[1];
                    indexContent += `import {${exportContent}} from "./${relativePath}";\n`;
                    indexContent += `export {${exportContent}};\n`;
                } else {
                    console.error(`Failed to match export line: ${exportLine}`);
                }
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