import {video} from "../../elementCreation/basicElements";

async function getVideoDuration(input: Blob | string): Promise<number> {
    const el = video({preload: "metadata"});

    return new Promise<number>((resolve, reject) => {
        let objectUrl: string | null = null;

        const cleanup = () => {
            el.removeAttribute("src");
            el.load();
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };

        el.onerror = () => {
            cleanup();
            reject(new Error("Failed to load video metadata"));
        };

        el.onloadedmetadata = () => {
            if (el.duration === Infinity) {
                el.currentTime = 1e101;
                el.ontimeupdate = () => {
                    el.ontimeupdate = null;
                    const d = el.duration;
                    cleanup();
                    resolve(d);
                };
            } else {
                const d = el.duration;
                cleanup();
                resolve(d);
            }
        };

        if (typeof input === "string") {
            el.crossOrigin = "anonymous";
            el.src = input;
        } else {
            objectUrl = URL.createObjectURL(input);
            el.src = objectUrl;
        }
    });
}

export {getVideoDuration};