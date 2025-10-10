import { describe, it, expect } from "vitest";
import {disposeEffect, disposeEffects, effect, initializeEffects, signal} from "../reactivity";
import {SignalBox} from "../reactivity.types";

const flushEffects = async () => {
    await Promise.resolve();
    await Promise.resolve();
};

describe("effect (function form)", () => {
    it("runs immediately and reruns on dependency changes", async () => {
        const x: SignalBox<number> = signal(0);

        let seen: number[] = [];
        const stop = effect(() => {
            seen.push(x.value);
        });

        // initial run
        expect(seen).toEqual([0]);

        // change -> rerun
        x.value = 1;
        await flushEffects();
        expect(seen).toEqual([0, 1]);

        // change again -> rerun
        x.value = 2;
        await flushEffects();
        expect(seen).toEqual([0, 1, 2]);

        // dispose stops further runs
        stop();
        x.value = 3;
        await flushEffects();
        expect(seen).toEqual([0, 1, 2]);
    });
});

describe("effect (decorator form, deferred start)", () => {
    it("does not run until initializeEffects(instance) is called", async () => {
        class VM {
            @signal count = 0;

            seen: number[] = [];

            @effect autorun() {
                // reads the decorated signal to track
                this.seen.push(this.count);
            }
        }

        const vm = new VM();

        // Not started yet
        expect(vm.seen).toEqual([]);

        // Start all decorated effects now
        initializeEffects(vm);
        expect(vm.seen).toEqual([0]);

        // mutate -> rerun
        vm.count = 1;
        await flushEffects();
        expect(vm.seen).toEqual([0, 1]);

        // dispose a single effect by name
        disposeEffect(vm, "autorun");
        vm.count = 2;
        await flushEffects();
        expect(vm.seen).toEqual([0, 1]); // no more runs
    });
});
