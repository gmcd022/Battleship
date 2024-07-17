export default function hitDetector(cell, i, player) {
    const row = Math.floor(i/10);
    const col = i % 10;
    const madeHit = player.gameboard.receiveAttack(col, row);
    if (madeHit) {
        cell.classList.add('hit');
    } else {
        cell.classList.add('miss');   
    }
    if (player.gameboard.allShipsSunk()) alert(`${player} loses`);
    // call bot attack function here
    }

// likely need to remove gameboard in receiveAttack function
// add gameboard to parameters