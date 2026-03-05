import {TurboModel, TurboDataBlock, Point, blockSignal, Delegate} from "../../../../build/turbodombuilder.esm";

class TurboGridModel<
    DataType = any,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any,
    BlockType extends TurboDataBlock<DataType, KeyType, IdType> = TurboDataBlock<DataType, KeyType, IdType>
> extends TurboModel<DataType, KeyType, IdType, "map", BlockType> {
    @blockSignal() protected objectPositions: TurboDataBlock<Map<string, Point>, string>;
    @blockSignal() protected columnWidthsBlock: TurboDataBlock<Array<number>, number>;
    @blockSignal() protected rowHeightsBlock: TurboDataBlock<Array<number>, number>;

    protected objectsAtCell: TurboDataBlock<Map<string, string[]>, string>;

    public defaultRowHeight: number = 20;
    public defaultColumnWidth: number = 20;

    public readonly onColumnWidthChanged: Delegate<(column: number, newWidth: number) => void> = new Delegate();
    public readonly onRowHeightChanged: Delegate<(row: number, newHeight: number) => void> = new Delegate();

    public initialize() {
        super.initialize();
        this.setBlock([20, 20, 30, 20, 40] as any, undefined, "columnWidths");
        this.setBlock([10, 20, 30, 30, 40, 50, 60] as any, undefined, "rowHeights");
        this.setBlock(new Map() as any, undefined, "objectPositions");

        this.objectsAtCell = new TurboDataBlock(new Map() as any);

        this.objectPositions.onKeyChanged.add((objectId: string, position: Point, deleted?: boolean) =>
            this.updateObjectCellOnPositionChanged(objectId, position, deleted));
        this.columnWidthsBlock.onKeyChanged.add((column: number, newWidth: number) =>
            this.onColumnWidthChanged.fire(column, newWidth));
        this.rowHeightsBlock.onKeyChanged.add((row: number, newHeight: number) =>
            this.onColumnWidthChanged.fire(row, newHeight));
    }

    public get rowHeights(): number[] {
        return this.rowHeightsBlock.values;
    }

    public get columnWidths(): number[] {
        return this.columnWidthsBlock.values;
    }

    public get columnCount(): number {
        return this.columnWidthsBlock.size;
    }

    public get rowCount(): number {
        return this.rowHeightsBlock.size;
    }

    public get cellCount(): number {
        return this.columnCount * this.rowCount;
    }

    public get totalWidth(): number {
        let size = 0;
        for (let i = 0; i < this.columnCount; i++) size += this.columnWidthsBlock.get(i);
        return size;
    }

    public set totalWidth(value: number) {
        if (!value || value < 0) return;
        const oldTotalWidth = this.totalWidth;
        if (!oldTotalWidth) return;
        for (let i = 0; i < this.columnCount; i++) this.columnWidthsBlock.set(i, this.columnWidthsBlock.get(i) * value / oldTotalWidth);
    }

    public get totalHeight(): number {
        let size = 0;
        for (let i = 0; i < this.rowCount; i++) size += this.rowHeightsBlock.get(i);
        return size;
    }

    public set totalHeight(value: number) {
        if (!value || value < 0) return;
        const oldTotalHeight = this.totalHeight;
        if (!oldTotalHeight) return;
        for (let i = 0; i < this.rowCount; i++) this.rowHeightsBlock.set(i, this.rowHeightsBlock.get(i) * value / oldTotalHeight);
    }

    public insertRow(index: number, size?: number) {
        if (index < 0) return;
        if (!size) size = this.rowHeightsBlock.get(index) ?? this.defaultRowHeight;
        this.rowHeightsBlock.add(size, index);
        //TODO update positions
    }

    public removeRow(index: number) {
        if (index < 0) return;
        this.rowHeightsBlock.delete(index);
        //TODO update positions
    }

    public insertColumn(index: number, size?: number) {
        if (!size) size = this.columnWidthsBlock.get(index) ?? this.defaultColumnWidth;
        this.columnWidthsBlock.add(size, index);
        //TODO update positions
    }

    public removeColumn(index: number) {
        if (index < 0) return;
        this.columnWidthsBlock.delete(index);
        //TODO update positions
    }

    public getObjectsAt(position: Point): string[] {
        return (this.objectsAtCell.get(this.toCell(position)) ?? []).slice();
    }

    public getObjectCell(objectId: string): Point {
        return this.objectPositions.get(objectId) ?? new Point(-1, -1);
    }

    public moveObject(objectId: string, position: Point) {
        this.objectPositions.set(objectId, position);
    }

    public removeObject(objectId: string) {
        this.objectPositions.delete(objectId);
    }

    public toCell(point: Point) {
        return point?.x + ":" + point?.y;
    }

    public toPoint(cell: string) {
        if (!cell) return new Point(-1, -1);
        const split = cell.split(":");
        const x = Number.parseInt(split[0]);
        const y = Number.parseInt(split[1]);
        return new Point(isNaN(x) ? -1 : x, isNaN(y) ? -1 : y);
    }

    protected updateObjectCellOnPositionChanged(objectId: string, newPosition: Point, deleted?: boolean) {
        for (const [cell, objects] of this.objectsAtCell) {
            const index: number = objects.indexOf(objectId);
            if (index === -1) continue;
            objects.splice(index, 1);
            if (objects.length === 0) this.objectsAtCell.delete(cell);
        }

        if (deleted) return;
        const cell = this.toCell(newPosition);
        if (!this.objectsAtCell.has(cell)) this.objectsAtCell.set(cell, []);
        this.objectsAtCell.get(cell).push(objectId);
    }
}

export {TurboGridModel};