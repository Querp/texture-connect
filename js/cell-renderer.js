export class CellRenderer {

    getCellElement(x, y) {
        const cellE = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        if (!cellE) return false

        return cellE
    }

    setActive(x, y, isToBeSetActive) {
        const cellE = this.getCellElement(x, y);
        if (!cellE) return false

        if (isToBeSetActive) {
            cellE.classList.add('active');
        } else {
            cellE.classList.remove('active');
        }
    }

    setDataType(x, y, type) {
        const cellE = this.getCellElement(x, y);
        if (!cellE) return false
        cellE.setAttribute('data-type', type);
    }

    setBackground(x, y, connections) {
        if (connections == null) return
        const cellE = this.getCellElement(x, y);
        if (!cellE) return false
        
        let bgString = createBgString(connections);
        cellE.style.setProperty('--background', bgString);
    }

    initGrid(worldDefs) {
        const gameE = document.getElementById('game');
        for (let y = 0; y < worldDefs.ROWS; y++) {
            for (let x = 0; x < worldDefs.COLUMNS; x++) {
                const cellE = document.createElement('div');
                cellE.classList.add('cell');
                cellE.setAttribute('data-x', x);
                cellE.setAttribute('data-y', y);
                // cellE.textContent = `${x}, ${y}`;
                gameE.appendChild(cellE);
            }
        }
    }
}

function createBgString(connections){
    let bgString = ``;
    if (connections.length === 0) return '';
    // console.log(connections);
    
    for (let i = 0; i < connections.length; i++) {
        const c = connections[i];
        // console.log(c);
        bgString += `url("../images/sprites/road/${c}.png"),`;
    }

    // remove trailing ","
    bgString = bgString.slice(0, -1);
    
    // console.log(bgString);
    return bgString
}

