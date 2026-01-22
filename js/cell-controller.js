import { Connections } from "./connections.js";

const DIRS = {
    TOP: { dx: 0, dy: -1, label: "top" },
    RIGHT: { dx: 1, dy: 0, label: "right" },
    BOTTOM: { dx: 0, dy: 1, label: "bottom" },
    LEFT: { dx: -1, dy: 0, label: "left" },

    TOP_LEFT: { dx: -1, dy: -1, label: "top-left" },
    TOP_RIGHT: { dx: 1, dy: -1, label: "top-right" },
    BOTTOM_RIGHT: { dx: 1, dy: 1, label: "bottom-right" },
    BOTTOM_LEFT: { dx: -1, dy: 1, label: "bottom-left" },
};

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
        const connectionManager = new Connections(x, y);
        const isToBeSetActive = (active === 'add') ? true : false;
        const type = this.inputStates.selectedTile;
        this.renderer.setActive(x, y, isToBeSetActive);
        this.renderer.setDataType(x, y, type);

        for (const [key, connection] of Object.entries(connectionManager.connections)) {
            this.setConnections(connection);
        }

        this.handleDiagonals(connectionManager);

        for (const [key, connection] of Object.entries(connectionManager.connections)) {
            const cx = connection.pos.x;
            const cy = connection.pos.y;
            this.renderer.setBackground(cx, cy, connection.connections);
        }
    }

    setConnections(connection) {
        const { x, y } = connection.pos;

        // Only continue if neighbor is within grid
        if (!this.cells.getCell(x, y)) return [];

        // Only connect to neighbors of same type
        const cellType = this.cells.getCellType(x, y);

        for (const dir of Object.values(DIRS)) {
            if (this.cells.isCellOfType(x + dir.dx, y + dir.dy, cellType)) {
                connection.connections.push(dir.label);
            }
        }

        connection.connections.push('center');
    }

    handleDiagonals(connectionManager) {
        const DIAGONALS = {
            0: "top-left",
            2: "top-right",
            4: "bottom-right",
            6: "bottom-left"
        };

        for (const [neighborKey, connection] of Object.entries(connectionManager.connections)) {
            // console.log(neighborKey, connection);

            for (const [diagonalKey, diagonal] of Object.entries(DIAGONALS)) {
                // console.log(neighborKey, diagonalKey, diagonal);
                const hasDiagonal = connection.connections.includes(diagonal);
                const isCenter = connection.label === "center";
                
                if (hasDiagonal && isCenter) {
                    console.log(neighborKey, diagonalKey, hasDiagonal, connection);
                    const neighborKey1 = (Number(diagonalKey) - 1 + 8) % 8;
                    const neighborKey2 = (Number(diagonalKey) + 1 + 8) % 8;
                    const nbAngleDigit1 = (Number(diagonalKey) + 2 + 8) % 8;
                    const nbAngleDigit2 = (Number(diagonalKey) - 2 + 8) % 8;
                    const nbAngleString1 = this.connectionDigitToString(nbAngleDigit1);
                    const nbAngleString2 = this.connectionDigitToString(nbAngleDigit2);

                    connectionManager.connections[neighborKey1].connections.push(`c-${nbAngleString1}`);
                    connectionManager.connections[neighborKey2].connections.push(`c-${nbAngleString2}`);

                    console.log('Diagonal connections:');
                    console.log(connectionManager.connections[neighborKey1].connections);
                    console.log(connectionManager.connections[neighborKey2].connections);
                    // console.log(`${neighborKey1}(${nbAngleDigit1}/${nbAngleString1}), ${Number(diagonalKey)}, ${neighborKey2}(${nbAngleDigit2}/${nbAngleString2})`);
                }
            }
        }
    }

    connectionDigitToString(digit) {
        const strings = {
            0: "top-left",
            1: "top",
            2: "top-right",
            3: "right",
            4: "bottom-right",
            5: "bottom",
            6: "bottom-left",
            7: "left",
        }
        return strings[digit]
    }

    connectionStringToDigit(string) {
        const digits = {
            "top-left": 0,
            "top": 1,
            "top-right": 2,
            "right": 3,
            "bottom-right": 4,
            "bottom": 5,
            "bottom-left": 6,
            "left": 7,
        }
        return digits[string]
    }

}
