import botTurn from "./botTurn";
import { endGame } from "./gamelogic";

export default function hitDetector(cell, i, botGameboard, userGameboard) {
    const row = Math.floor(i/10);
    const col = i % 10;
    const madeHit = botGameboard.receiveAttack(col, row);
    if (madeHit) {
        cell.classList.add('hit');
    } else {
        cell.classList.add('miss');   
    }
    if (botGameboard.allShipsSunk()) {
        endGame('user');
    } botTurn(userGameboard)
    }