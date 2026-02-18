import {TurboView, element, SvgNamespace, turbo, effect, Point} from "../../../../build/turbodombuilder.esm";
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
        turbo(this).addObjectToSubstrate(this.line)
            .addObjectToSubstrate(this.startHandle)
            .addObjectToSubstrate(this.endHandle);
    }

    protected setupUIElements() {
        super.setupUIElements();
        this.svg = element({tag: "svg", namespace: SvgNamespace, width: "100%", height: "100%"}) as SVGSVGElement;
        this.line = element({tag: "line", namespace: SvgNamespace}) as SVGLineElement;
        this.hitLine = element({tag: "line", namespace: SvgNamespace}) as SVGLineElement;
        turbo(this.hitLine).setAttribute("stroke", "transparent").setAttribute("pointer-events", "stroke");

        this.startHandle = Square.create({size: 20, color: "white", classes: "handle", position: this.model.origin.sub(100, 0)});
        this.endHandle = Square.create({size: 20, color: "white", classes: "handle", position: this.model.origin.add(100, 0)});
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this.svg).addChild([this.line, this.hitLine]);
        turbo(this).addChild([this.svg, this.startHandle, this.endHandle]);
    }

    @effect private updateLines() {
        this.model.origin = Point.midPoint(this.startHandle.position, this.endHandle.position);
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