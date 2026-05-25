import "./contentSwitch.css";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {Shown} from "../../../types/enums.types";
import {auto} from "../../../decorators/auto/auto";
import {StatefulReifect} from "../../wrappers/statefulReifect/statefulReifect";
import {StatefulReifectProperties} from "../../wrappers/statefulReifect/statefulReifect.types";
import {define} from "../../../decorators/define/define";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {ContentSwitchMode, TurboContentSwitchProperties} from "./contentSwitch.types";
import {TurboSelectElement} from "../../basics/selectElement/selectElement";
import {Reifect} from "../../wrappers/reifect/reifect";

class TurboContentSwitch<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboSelectElement<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> {
    public static defaultProperties = {
        transitionReifect: new Reifect({styles: "transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;"}),
    };

    public declare readonly properties: TurboContentSwitchProperties<ViewType, DataType, ModelType, EmitterType>;

    private _previousSelectedIndex: number = -1;

    @auto({defaultValue: ContentSwitchMode.fadeRight})
    public set mode(value: ContentSwitchMode) {
        turbo(this).toggleClass("carousel", value === ContentSwitchMode.carousel);
    }
    public get mode(): ContentSwitchMode {return}

    @auto({defaultValue: 0.3})
    public set transitionDuration(_value: number) {}
    public get transitionDuration(): number {return}

    @auto() public set transitionReifect(value: Reifect) {
        if (value && this.entries.length > 0) value.attach(...this.entries);
    }

    @auto() public set movementReifect(value: StatefulReifect<Shown>) {
        if (value && this.entries.length > 0) value.attach(...this.entries);
    }

    public initialize() {
        // this.movementReifect = new StatefulReifect<Shown>({
        //     states: Shown,
        //     styles: (state, index) => {
        //         const newIndex = this.select.getIndex(this.select.selectedEntry);
        //         const forward = this._previousSelectedIndex < 0 || newIndex > this._previousSelectedIndex;
        //         //TODO
        //     }
        // });

        this.select.parent = this;

        this.select.onEntryAdded.add((entry) => {
            if (this.mode === ContentSwitchMode.carousel) {
                this.initCarouselEntry(entry as HTMLElement);
                return;
            }
            const reifect = this.movementReifect;
            if (!reifect?.enabled) return;
            reifect.attach(entry);
            reifect.initialize(Shown.hidden, entry, {applyStylesInstantly: true});
            turbo(entry as HTMLElement).setStyles({position: "absolute"}, true);
        });

        this.select.onSelect.add(() => {
            if (this.mode === ContentSwitchMode.carousel) {
                this.applyCarouselTransition();
            } else {
                this.applyFadeTransition();
            }
        });

        super.initialize();
    }

    private applyFadeTransition() {
        const selectedEntry = this.select.selectedEntry;
        this.select.entries.forEach(entry => {
            const isSelected = entry === selectedEntry;
            turbo(entry as HTMLElement).setStyles({position: isSelected ? "relative" : "absolute"}, true);
            const reifect = this.movementReifect;
            if (reifect?.enabled) reifect.apply(isSelected ? Shown.visible : Shown.hidden, entry);
        });
    }

    private initCarouselEntry(entry: HTMLElement) {
        turbo(entry).setStyles({
            position: "absolute",
            opacity: "0",
            transform: "translateX(100%)",
            pointerEvents: "none",
            transition: "none",
        }, true);
    }

    private applyCarouselTransition() {
        const entries = this.select.entries;
        const selectedEntry = this.select.selectedEntry;
        const newIndex = this.select.getIndex(selectedEntry);
        const forward = this._previousSelectedIndex < 0 || newIndex > this._previousSelectedIndex;
        const prevIndex = this._previousSelectedIndex;
        this._previousSelectedIndex = newIndex;
        const duration = this.transitionDuration;
        const transitionStr = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;

        entries.forEach((entry, i) => {
            const el = entry as HTMLElement;
            const isSelected = entry === selectedEntry;
            const wasPrevious = i === prevIndex;

            if (isSelected) {
                turbo(el).setStyles({
                    transition: "none",
                    transform: `translateX(${forward ? "100%" : "-100%"})`,
                    opacity: "0",
                    position: "relative",
                    pointerEvents: "none",
                }, true);
                requestAnimationFrame(() => {
                    turbo(el).setStyles({
                        transition: transitionStr,
                        transform: "translateX(0)",
                        opacity: "1",
                        pointerEvents: "all",
                    }, true);
                });
            } else if (wasPrevious) {
                turbo(el).setStyles({
                    transition: transitionStr,
                    transform: `translateX(${forward ? "-100%" : "100%"})`,
                    opacity: "0",
                    pointerEvents: "none",
                }, true);
                setTimeout(() => {
                    turbo(el).setStyles({
                        position: "absolute",
                        transition: "none",
                    }, true);
                }, duration * 1000);
            } else {
                turbo(el).setStyles({
                    transition: "none",
                    position: "absolute",
                    opacity: "0",
                    transform: `translateX(${i < newIndex ? "-100%" : "100%"})`,
                    pointerEvents: "none",
                }, true);
            }
        });
    }

    private generateTransitionReifect(value: StatefulReifect<Shown> | StatefulReifectProperties<Shown>) {
        if (value instanceof StatefulReifect) return value;
        if (typeof value === "object" && value !== null) {
            return new StatefulReifect<Shown>(value as StatefulReifectProperties<Shown>);
        }
        if (this.mode === ContentSwitchMode.carousel) {
            const r = new StatefulReifect<Shown>({states: [Shown.visible, Shown.hidden], styles: {}});
            r.enabled = false;
            return r;
        }
        const dx = this.mode === ContentSwitchMode.fadeLeft ? "-100%" : "100%";
        //TODO remove this
        return new StatefulReifect<Shown>({
            states: [Shown.visible, Shown.hidden],
            styles: {
                [Shown.visible]: () => ({
                    opacity: "1",
                    transform: "translateX(0)",
                    pointerEvents: "all",
                    transition: `opacity ${this.transitionDuration}s ease-out, transform ${this.transitionDuration}s ease-out`,
                }),
                [Shown.hidden]: () => ({
                    opacity: "0",
                    transform: `translateX(${dx})`,
                    pointerEvents: "none",
                    transition: `opacity ${this.transitionDuration}s ease-out, transform ${this.transitionDuration}s ease-out`,
                })
            }
        });
    }
}

define(TurboContentSwitch, "turbo-content-switch");
export {TurboContentSwitch};