/**
 * Define MVC-style accessors on a class prototype via Object.defineProperty.
 * Adds: selected, view, model, data, dataId, dataIndex, dataSize
 */
export function defineMvcAccessors<Type extends new (...args: any[]) => any>(constructor: Type) {
    const prototype = constructor.prototype;

    Object.defineProperty(prototype, "view", {
        get(this: any) {return this.mvc?.view},
        set(this: any, view: unknown) {
            if (!this.mvc) throw new Error("view: missing this.mvc");
            this.mvc.view = view;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(prototype, "model", {
        get(this: any) {return this.mvc?.model},
        set(this: any, model: unknown) {
            if (!this.mvc) throw new Error("model: missing this.mvc");
            this.mvc.model = model;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(prototype, "data", {
        get(this: any) {return this.mvc?.data},
        set(this: any, data: unknown) {
            if (!this.mvc) throw new Error("data: missing this.mvc");
            this.mvc.data = data;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(prototype, "dataId", {
        get(this: any) {return this.mvc?.dataId},
        set(this: any, v: string) {
            if (!this.mvc) throw new Error("dataId: missing this.mvc");
            this.mvc.dataId = v;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(prototype, "dataIndex", {
        get(this: any) {return this.mvc?.dataIndex},
        set(this: any, v: number) {
            if (!this.mvc) throw new Error("dataIndex: missing this.mvc");
            this.mvc.dataIndex = v;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(prototype, "dataSize", {
        get(this: any) {return this.mvc?.dataSize},
        enumerable: true,
        configurable: true
    });
}