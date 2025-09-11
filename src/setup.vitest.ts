import { beforeAll } from 'vitest';
import {turbofy} from "./turboFunctions/turboFunctions";

beforeAll(() => {
    turbofy({
        excludeMiscFunctions: true,
    })
});

export class ManagerStub {
    private current?: string;
    public locks: Array<{ element: any; props: any }> = [];
    setupCustomDispatcher() {/* no-op */}
    setTool(name: string) { this.current = name; }
    addTool(name: string, click: any) { }
    getCurrentToolName() { return this.current; }
    lock(element: any, props: any) { this.locks.push({ element, props }); }
}