import {TurboHandler} from "../../../../build/turbodombuilder.esm";
import {ImportedFilesModel} from "./importedFiles.model";

export class ImportedFilesFilesHandler extends TurboHandler<ImportedFilesModel> {
    private esbuildReady: Promise<void>;

    protected setup() {
        super.setup();
        this.esbuildReady = this.initEsbuild().catch(err => {
            console.error("[ImportedFiles] esbuild init failed:", err);
            throw err;
        });
    }

    private esbuild: any = null;

    private async initEsbuild() {
        // @ts-ignore
        const mod = await import("https://esm.sh/esbuild-wasm@0.25.0");
        const esbuild = mod.default ?? mod;
        await esbuild.initialize({
            wasmURL: "https://esm.sh/esbuild-wasm@0.25.0/esbuild.wasm",
            worker: true,
        });
        this.esbuild = esbuild;
    }

    public async processFiles(files: FileList | File[]) {
        const fileArray = Array.from(files).filter(f => /\.(ts|js)$/.test(f.name));
        if (!fileArray.length) return;

        await this.esbuildReady;

        const fileMap = new Map<string, string>();
        for (const file of fileArray) fileMap.set(file.name, this.rewriteSourceImports(await file.text()));
        const entryFile = this.resolveEntryPoint(fileMap);

        try {
            const js = await this.compile(entryFile, fileMap);
            const {module, blobUrl} = await this.loadModule(js);
            const classes = this.discoverClasses(module);
            this.model.set(entryFile, {
                name: entryFile,
                size: fileMap.get(entryFile)!.length,
                classes,
                addedAt: new Date(),
                module,
                blobUrl,
            });
        } catch (err) {
            console.error(`[ImportedFiles] Failed to load plugin "${entryFile}":`, err);
            throw err;
        }
    }

    private async compile(entryName: string, fileMap: Map<string, string>): Promise<string> {
        const result = await this.esbuild.build({
            entryPoints: [entryName],
            bundle: true,
            write: false,
            format: "esm",
            external: ["../../../../build/turbodombuilder.esm"],
            plugins: [this.virtualFsPlugin(fileMap)],
        });

        let code = result.outputFiles[0].text;
        code = this.rewriteExternals(code);
        return code;
    }

    private rewriteSourceImports(source: string): string {
        return source.replace(
            /import\s*\{([^}]+)\}\s*from\s*["'][^"']+["'];?/g,
            (_, imports) => {
                const names = imports.split(",").map((s: string) => s.trim()).filter(Boolean);
                return names.map((n: string) =>
                    `const ${n} = (window as any).__hostLibs?.${n};`
                ).join("\n");
            }
        );
    }

    private virtualFsPlugin(fileMap: Map<string, string>): import("esbuild-wasm").Plugin {
        return {
            name: "virtual-fs",
            setup(build) {
                build.onResolve({ filter: /.*/ }, args => {
                    // Strip leading path and extension to match against known files
                    const basename = args.path.replace(/^.*\//, "").replace(/\.[tj]s$/, "");
                    const match = [...fileMap.keys()].find(k =>
                        k.replace(/\.[tj]s$/, "") === basename
                    );
                    if (match) return { path: match, namespace: "virtual" };

                    // Everything else — external libs AND relative imports not in the
                    // dropped file set — mark as external so esbuild skips them
                    return { path: args.path, external: true };
                });

                build.onLoad({ filter: /.*/, namespace: "virtual" }, args => ({
                    contents: fileMap.get(args.path)!,
                    loader: args.path.endsWith(".ts") ? "ts" : "js",
                }));
            },
        };
    }

    private rewriteExternals(code: string): string {
        // Rewrite any remaining import statements to pull from window.__hostLibs
        // Covers both turbodombuilder and relative imports (e.g. Square from "../square/square")
        return code.replace(
            /import\s*\{([^}]+)\}\s*from\s*["'][^"']+["'];?/g,
            (_, imports) => {
                const names = imports.split(",").map((s: string) => s.trim()).filter(Boolean);
                return names.map((n: string) => {
                    // Try each lib namespace in __hostLibs until one has it
                    return `const ${n} = Object.values(window.__hostLibs ?? {}).map(lib => lib?.${n}).find(Boolean);`;
                }).join("\n");
            }
        );
    }

    private async loadModule(js: string): Promise<{ module: Record<string, unknown>; blobUrl: string }> {
        const blob = new Blob([js], { type: "text/javascript" });
        const blobUrl = URL.createObjectURL(blob);
        const module = await import(blobUrl) as Record<string, unknown>;
        return { module, blobUrl };
    }

    private discoverClasses(module: Record<string, unknown>): string[] {
        return Object.entries(module)
            .filter(([, val]) => {
                if (typeof val !== "function") return false;
                try {
                    // Check if it's a class (has a prototype with constructor)
                    return typeof val.prototype?.constructor === "function";
                } catch {
                    return false;
                }
            })
            .map(([name]) => name);
    }

    private resolveEntryPoint(fileMap: Map<string, string>): string {
        if (fileMap.size === 1) return [...fileMap.keys()][0];

        const allNames = new Set(fileMap.keys());
        const imported = new Set<string>();

        for (const source of fileMap.values()) {
            const re = /from\s+["'][^"']*\/([^"'/]+)["']/g;
            let m: RegExpExecArray | null;
            while ((m = re.exec(source)) !== null) {
                // Match against known file names with or without extension
                for (const name of allNames) {
                    if (name.startsWith(m[1].replace(/\.[tj]s$/, ""))) {
                        imported.add(name);
                    }
                }
            }
        }

        const roots = [...allNames].filter(n => !imported.has(n));
        return roots[0] ?? [...allNames][0];
    }
}