import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
    {
        input: "src/script.js",
        output: [
            {file: "dist.js", format: "iife", name: "Turbo"}
        ],
        plugins: [
            nodeResolve(),
            commonjs(),
            postcss({
                plugins: [autoprefixer(), cssnano()]
            })
        ]
    },
];