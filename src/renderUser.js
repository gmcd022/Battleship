export default function fillUserBoard(boardElement) {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('user-cell');
      boardElement.appendChild(cell);
    }
}