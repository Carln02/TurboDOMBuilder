import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: process.env.NODE_ENV ?? "development",
    target: "web",
    entry: path.resolve(__dirname, "src/index.ts"),

    output: {
        filename: "dist.bundle.js",
        path: path.resolve(__dirname, "public"),
    },

    devServer: {
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        historyApiFallback: true,
        static: path.resolve(__dirname, "public")
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(__dirname, "tsconfig.json"),
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },

    devtool: "source-map"
};
