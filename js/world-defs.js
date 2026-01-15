export const worldDefs = {
    COLUMNS: 9,
    ROWS: 5,
}

export function initWorldDefsCss(){
    const gameE = document.getElementById('game');
    gameE.style.setProperty('--ratio-width', worldDefs.COLUMNS)
    gameE.style.setProperty('--ratio-height', worldDefs.ROWS)
}
