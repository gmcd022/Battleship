export default function botTurn(userGameboard) {
    const col = Math.floor(Math.random() * 10);
    const row = Math.floor(Math.random() * 10);

    let targetedArray = userGameboard.getTargetedArray()
    if (targetedArray.length > 0) {
        let index = Math.floor(Math.random() * targetedArray.length)
        let target = targetedArray.splice(index, 1); 
        let targetCol = target[0][0];
        let targetRow = target[0][1];
        if (!userGameboard.validShot(targetCol, targetRow)) {
            return botTurn(userGameboard);
        }
        else {
            botShotTracker(userGameboard, targetCol, targetRow);
            if (userGameboard.allShipsSunk()) {
                alert('Defeat!')
                }
        }
    }
    else if (!userGameboard.validShot(col,row)) {
        return botTurn(userGameboard);
    } else { 
        botShotTracker(userGameboard, col, row);
        
        if (userGameboard.allShipsSunk()) {
        alert('Defeat!')
        }
    }
}

function botShotTracker(userGameboard, col, row) {
    const cells = document.querySelectorAll('.user-cell');
    let targetCell = (row * 10) + col
    const madeHit = userGameboard.receiveAttack(col, row);
    if (madeHit) {
        cells[targetCell].classList.add("hit");
        let Array = focusTarget(col, row); 
        userGameboard.setTargetedArray(Array)

    } else {
        cells[targetCell].classList.add("miss");
        return false //changed to false from target (unused at this point)
    }
}

function focusTarget(col ,row) {
    let targetedArray = [];
    if (col + 1 < 10) targetedArray.push([col + 1, row]);
    if (col - 1 >= 0) targetedArray.push([col - 1, row]);
    if (row + 1 < 10) targetedArray.push([col, row + 1]);
    if (row - 1 >= 0) targetedArray.push([col, row - 1]);
    return targetedArray
}