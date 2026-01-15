export class CellController {
    constructor(cellManager, renderer, inputStates) {
        this.cells = cellManager;
        this.renderer = renderer;
        this.inputStates = inputStates;
    }

    addCell(x, y) {
        const cellType = this.inputStates.selectedTile;
        this.cells.addCell(x, y, cellType);
        this.updateCellAndNeighbors(x, y, 'add');
    }

    removeCell(x, y) {
        this.cells.removeCell(x, y);
        this.updateCellAndNeighbors(x, y, 'remove');
    }

    updateCellAndNeighbors(x, y, active) {
        const coords = [
            [x, y],
            [x, y - 1],
            [x, y + 1],
            [x - 1, y],
            [x + 1, y],
        ];

        const isToBeSetActive = (active === 'add') ? true : false;
        const type = this.inputStates.selectedTile;

        this.renderer.setActive(x, y, isToBeSetActive);
        this.renderer.setDataType(x, y, type);

        for (const [cx, cy] of coords) {
            // only update neighbor if same type ? no, but maybe later
            // const cellType = this.inputStates.selectedTile;
            // if (this.cells.isCellOfType(cx, cy - 1, cellType)) continue

            const connections = this.getConnections(cx, cy);
            if(connections === null) continue
            this.renderer.setBackground(cx, cy, connections);
        }
    }

    getConnections(x, y) {
        if (!this.cells.getCell(x, y)) return null;

        const cellType = this.cells.getCellType(x, y);

        // Save connections as single digit 
        // top = 1
        // right = 2
        // bottom = 4
        // left = 8

        // Then map digit to tile and rotation

        let connectionsDigit = 0;

        if (this.cells.isCellOfType(x, y - 1, cellType)) { // top
            connectionsDigit += 1;
        };
        if (this.cells.isCellOfType(x + 1, y, cellType)) { // right
            connectionsDigit += 2;
        };
        if (this.cells.isCellOfType(x, y + 1, cellType)) { // bottom
            connectionsDigit += 4;
        };
        if (this.cells.isCellOfType(x - 1, y, cellType)) { // left
            connectionsDigit += 8;
        };

        return connectionsDigit;
    }
}