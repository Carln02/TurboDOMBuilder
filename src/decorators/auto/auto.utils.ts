type AutoConstructorType = {
    installed: Map<PropertyKey, boolean>
};

export class AutoUtils {
    private constructorMap = new WeakMap<object, AutoConstructorType>();

    public constructorData(target: object) {
        let obj = this.constructorMap.get(target);
        if (!obj) {
            obj = {installed: new Map()};
            this.constructorMap.set(target, obj);
        }
        return obj!;
    }
}