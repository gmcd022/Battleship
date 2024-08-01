import { handleDrop } from "./gamelogic";

export default function fillUserBoard(boardElement, userGameboard) {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('user-cell');
      // add eventListeners for drag & drop
      cell.addEventListener('dragover', (event) => event.preventDefault());
      cell.addEventListener('drop', (event) => handleDrop(event, i, userGameboard));

      boardElement.appendChild(cell);
    }
}