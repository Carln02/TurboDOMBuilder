export type PluginEntry = {
    name: string;
    size: number;
    classes: string[];
    addedAt: Date;
    module: Record<string, unknown>;
    blobUrl: string;
};