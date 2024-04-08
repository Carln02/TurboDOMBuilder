import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const outDir = "build";
const outName = "turbodombuilder";

const typesDir = outDir + "/types";

export default [
    {
        input: "src/index.ts",
        output: [
            {file: outDir + "/" + outName + ".esm.js", format: "esm"},
            {file: outDir + "/" + outName + ".cjs.js", format: "cjs"},
            {file: outDir + "/" + outName + ".js", format: "iife", name: "Turbo"}
        ],
        plugins: [
            typescript({tsconfig: "./tsconfig.json"}),
            postcss({
                plugins: [autoprefixer(), cssnano()]
            })
        ]
    },
    {
        input: outDir + "/" + outName + ".esm.js",
        output: [
            {file: outDir + "/" + outName + ".esm.min.js", format: "esm"},
            {file: outDir + "/" + outName + ".cjs.min.js", format: "cjs"},
            {file: outDir + "/" + outName + ".min.js", format: "iife", name: "Turbo"}
        ],
        plugins: terser()
    },
    {
        input: typesDir + "/index.d.ts",
        output: [
            {file: outDir + "/" + outName + ".d.ts", format: "es"}
        ],
        plugins: [dts(), ignoreFiles([".scss", ".css"])]
    }
];

function ignoreFiles(extensions = []) {
    return {
        name: "ignore-files",
        resolveId(importee) {
            if (extensions.some(ext => importee.endsWith(ext))) {
                return { id: importee, external: true };
            }
        }
    };
}
