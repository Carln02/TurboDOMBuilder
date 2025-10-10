import {Effect} from "./reactivity.types";
import {ReactivityUtils} from "./reactivity.utils";

export class EffectUtils {
    public constructor(private readonly utils: ReactivityUtils) {}

    public makeEffect(callback: () => void): Effect {
        const utils = this.utils;
        return {
            callback,
            dependencies: new Set(),
            cleanups: [],
            scheduled: false,
            run() {
                for (const c of this.cleanups) c();
                this.cleanups = [];
                this.dependencies = new Set();

                utils.activeEffect = this;
                try { this.callback(); } finally { utils.activeEffect = null; }

                for (const dep of this.dependencies) {
                    const unsub = dep.sub(() => utils.schedule(this));
                    this.cleanups.push(unsub);
                }
            },
            dispose() {
                for (const c of this.cleanups) c();
                this.cleanups = [];
                this.dependencies.clear();
            }
        };
    }
}