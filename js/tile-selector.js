export function initTileSelector(inputStates) {
    const selectorsE = document.getElementById('tile-selectors');
    selectorsE.addEventListener('change', (e) => {
        if (e.target.type !== 'radio') return

        const labelE = e.target.closest('.selector');
        inputStates.selectedTile = labelE.dataset.type
    });
}