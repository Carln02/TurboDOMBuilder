import {TurboEmitter, TurboView, div, turbo} from "../../../../build/turbodombuilder.esm";
import {TurboGrid} from "./grid";
import {TurboGridModel} from "./grid.model";

class TurboGridView<
    ElementType extends TurboGrid = TurboGrid,
    ModelType extends TurboGridModel = TurboGridModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboView<ElementType, ModelType, EmitterType> {
    protected gridPanel: HTMLElement;
    protected cells: HTMLElement[] = [];

    protected setupUIElements() {
        super.setupUIElements();
        this.gridPanel = div({classes: "grid-panel"});
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild(this.gridPanel);
    }

    public initialize() {
        super.initialize();
        this.model.onColumnWidthChanged.add(this.updateGridGeometry.bind(this));
        this.model.onRowHeightChanged.add(this.updateGridGeometry.bind(this));
    }

    protected updateGridGeometry() {
        turbo(this.gridPanel).setStyle("gridTemplateColumns",
            this.model.columnWidths.map(width => width + "px").join(" "));
        turbo(this.gridPanel).setStyle("gridTemplateRows",
            this.model.rowHeights.map(height => height + "px").join(" "));
        this.ensureCells();
    }

    protected ensureCells() {
        const total = this.model.cellCount;
        while (this.cells.length < total) this.createCell(this.cells.length);
        while (this.cells.length > total) this.cells.pop()?.remove();
    }

    protected createCell(position: number) {
        this.cells[position] = div({classes: "cell", parent: this.gridPanel});
        return this.cells[position];
    }
}

export {TurboGridView};