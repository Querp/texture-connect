import { Cell } from './cell.js'

export class CellManager {
    constructor() {
        this.cells = {};
    }

    addCell(x, y, type){
        const c = new Cell(x, y, type);
        this.cells[`${x},${y}`] = c;
        // console.log(this.cells);
    }

    getCell(x, y){
        return this.cells[`${x},${y}`] ?? null;
    }
    getCellType(x, y){
        return this.cells[`${x},${y}`].type ?? null;
    }

    isCellOfType(x, y, type){
        const cellInstance = this.cells[`${x},${y}`];
        if (!cellInstance) return false;

        const cellType = cellInstance.type;
        // console.log(cellType);
        if (cellType !== type) return false;
        
        return true;
    }

    removeCell(x, y) {
        const key = `${x},${y}`;
        if (key in this.cells){
            delete this.cells[key];
            // console.log(this.cells);
            return true;
        }
        // console.log(this.cells);
        return false;
    }
}