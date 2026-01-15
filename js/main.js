import { CellController } from './cell-controller.js';
import { CellManager } from './cell-manager.js'
import { CellRenderer } from './cell-renderer.js';

import { initTileSelector } from './tile-selector.js';
import { inputStates } from './input-states.js';
import { worldDefs, initWorldDefsCss } from './world-defs.js';

const gameE = document.getElementById('game');
initWorldDefsCss();

const cells = new CellManager();
const renderer = new CellRenderer();
const controller = new CellController(cells, renderer, inputStates);
initTileSelector(inputStates);
renderer.initGrid(worldDefs);




gameE.addEventListener('mousedown', (e) => {
    const cellE = e.target.closest('.cell');

    // update inputStates
    inputStates.isMouseDown = true;
    const cellIsActive = cellE.classList.contains('active');
    inputStates.mouseDownAction = cellIsActive ? 'remove' : 'add';

    // set cell & neighbors
    setCell(cellE);
});

window.addEventListener('mouseup', (e) => {
    inputStates.isMouseDown = false;
});

gameE.addEventListener('mousemove', (e) => {
    if (!inputStates.isMouseDown) return

    const cellE = e.target.closest('.cell');

    if (isCellNew(cellE)) {
        inputStates.lastHoveredCell = cellE;
        setCell(cellE);
    }
});


function cellX(cellE) {
    if (cellE) {
        return Number(cellE.getAttribute('data-x'));
    }
    return false;
}
function cellY(cellE) {
    if (cellE) {
        return Number(cellE.getAttribute('data-y'));
    }
    return false;
}
function isCellNew(cellE) {
    return cellE !== inputStates.lastHoveredCell;
}

function setCell(cellE) {
    const x = cellX(cellE);
    const y = cellY(cellE);
    if (inputStates.mouseDownAction === 'add') {
        controller.addCell(x, y, inputStates.mouseDownAction);
    } else if (inputStates.mouseDownAction === 'remove') {
        controller.removeCell(x, y);
    }
}




