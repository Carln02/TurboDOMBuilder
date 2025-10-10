type ObserveConstructorType = {
    installed: Map<PropertyKey, boolean>
};

export class ObserveUtils {
    private constructorMap = new WeakMap<object, ObserveConstructorType>();

    public constructorData(target: object) {
        let obj = this.constructorMap.get(target);
        if (!obj) {
            obj = {installed: new Map()};
            this.constructorMap.set(target, obj);
        }
        return obj!;
    }
}