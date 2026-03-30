import {TurboView, element, SvgNamespace, turbo, effect} from "../../../../build/turbodombuilder.esm";
import {StickyLine} from "./stickyLine";
import {StickyLineModel} from "./stickyLine.model";
import {Square} from "../square/square";

export class StickyLineView extends TurboView<StickyLine, StickyLineModel> {
    private svg: SVGSVGElement;
    public line: SVGLineElement;
    private hitLine: SVGLineElement;

    public startHandle: Square;
    public endHandle: Square;

    public initialize(): void {
        super.initialize();
        requestAnimationFrame(() => turbo(this).getSubstrateObjectList().add(this.line, this.startHandle, this.endHandle));
    }

    protected setupUIElements() {
        super.setupUIElements();
        this.svg = element({tag: "svg", namespace: SvgNamespace, width: "100%", height: "100%"}) as SVGSVGElement;
        this.line = element({tag: "line", namespace: SvgNamespace}) as SVGLineElement;
        this.hitLine = element({tag: "line", namespace: SvgNamespace}) as SVGLineElement;
        turbo(this.hitLine).setAttribute("stroke", "transparent").setAttribute("pointer-events", "stroke");

        this.startHandle = Square.create({elementSize: 20, color: "white", classes: "handle"});
        this.endHandle = Square.create({elementSize: 20, color: "white", classes: "handle"});
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this.svg).addChild([this.line, this.hitLine]);
        turbo(this).addChild([this.svg, this.startHandle, this.endHandle]);
    }

    @effect private updateLines() {
        this.updateLine(this.line);
        this.updateLine(this.hitLine);
    }

    @effect private updateThickness() {
        turbo(this.line).setAttribute("stroke-width", this.model.thickness);
        this.startHandle.style.borderWidth = this.model.thickness + "px";
        this.endHandle.style.borderWidth = this.model.thickness + "px";

    }

    @effect private updateHitThickness() {
        turbo(this.hitLine).setAttribute("stroke-width", this.model.hitThickness);
    }

    @effect private updateColor() {
        turbo(this.line).setAttribute("stroke", this.model.color);
        this.startHandle.style.borderColor = this.model.color;
        this.endHandle.style.borderColor = this.model.color;
    }

    private updateLine(line: SVGLineElement) {
        line.setAttribute("x1", String(this.startHandle.position.x));
        line.setAttribute("y1", String(this.startHandle.position.y));
        line.setAttribute("x2", String(this.endHandle.position.x));
        line.setAttribute("y2", String(this.endHandle.position.y));
    }
}