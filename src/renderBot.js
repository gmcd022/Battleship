import hitDetector from "./hitDetector";

export default function fillBotBoard(boardElement, bot, user) {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('bot-cell');
      cell.addEventListener('click', () => {
        hitDetector(cell, i, bot, user)
      }, {once: true});

      boardElement.appendChild(cell);
    }
}