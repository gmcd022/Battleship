export default function showUserShips(gameboard) {
    const cells = document.querySelectorAll('.user-cell');
    for (let i =0; i < 100; i++) {
        if (gameboard[Math.floor(i / 10)][i % 10] !== '') {
            cells[i].classList.add('ship');
        }
    }
}