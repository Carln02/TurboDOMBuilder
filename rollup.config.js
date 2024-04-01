import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

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
        plugins: typescript({tsconfig: "./tsconfig.json"})
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
        plugins: dts(),
    }
];
