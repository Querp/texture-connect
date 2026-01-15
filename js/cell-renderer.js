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

        // Map connection number to tile (filename) and rotation
        const tileName = mapConnectionDigitToTileName[connections];
        // console.log(tileName.label);

        if (!tileName) return
        let bgString = `url("../images/sprites/road2/${tileName.label}.png")`;
        const angle = `${tileName.angle}deg`;

        cellE.style.setProperty('--background', bgString);
        cellE.style.setProperty('--rotation', angle);
    }

    initGrid(worldDefs) {
        const gameE = document.getElementById('game');
        for (let y = 0; y < worldDefs.ROWS; y++) {
            for (let x = 0; x < worldDefs.COLUMNS; x++) {
                const cellE = document.createElement('div');
                cellE.classList.add('cell');
                cellE.setAttribute('data-x', x);
                cellE.setAttribute('data-y', y);
                // cellE.textContent = `${x}:${y}`;
                gameE.appendChild(cellE);
            }
        }
    }
}

const mapConnectionDigitToTileName = {
  0:  { label: 'base', angle: 0 },

  1:  { label: 'end', angle: 180 },
  2:  { label: 'end', angle: 270 },
  4:  { label: 'end', angle: 0 },
  8:  { label: 'end', angle: 90 },

  5:  { label: 'straight', angle: 0 },   // top + bottom
  10: { label: 'straight', angle: 90 },  // left + right

  3:  { label: 'corner', angle: 270 },     // top + right
  6:  { label: 'corner', angle: 0 },    // right + bottom
  12: { label: 'corner', angle: 90 },   // bottom + left
  9:  { label: 'corner', angle: 180 },   // left + top

  7:  { label: 't', angle: 270 },           // missing left
  11: { label: 't', angle: 180 },          // missing bottom
  14: { label: 't', angle: 0 },         // missing right
  13: { label: 't', angle: 90 },         // missing top

  15: { label: 'cross', angle: 0 },
};