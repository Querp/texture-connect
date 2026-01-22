export const worldDefs = {
    COLUMNS: 3,
    ROWS: 3,
}

export function initWorldDefsCss(){
    const gameE = document.getElementById('game');
    gameE.style.setProperty('--ratio-width', worldDefs.COLUMNS)
    gameE.style.setProperty('--ratio-height', worldDefs.ROWS)
}