const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    output: {
        filename: "turbodombuilder.js",
        path: path.resolve(__dirname, "bundle"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};