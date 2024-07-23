// I'm trying to enable smarter bot plays using last hit shots to select next shots
// It may be easier to set "moods" for bot player
// This would likely require refactoring to replace Gameboards with players for multiple functions

export default function botTurn(userGameboard) {
    //if (didLastHit === false)
    
    const col = Math.floor(Math.random() * 10);
    const row = Math.floor(Math.random() * 10);
     
    if (!userGameboard.validShot(col,row)) {
        return botTurn(userGameboard);
    } else { 
        botShotTracker(userGameboard, col, row)
        // let lastHit = didLastHit(botShotTracker(userGameboard, col, row));
        // if (lastHit){ let aimArray = aimAround(lastHit)};
        // new array from forEach target of aimArray - validShot()
        // select target from array using random * array.length
        // if lasthit = false, attack as normal with random co-ordinates
        
        if (userGameboard.allShipsSunk()) {
        alert('Defeat!')
        }
    }
}

function botShotTracker(userGameboard, col, row) {
    const cells = document.querySelectorAll('.user-cell');
    let targetCell = (row * 10) + col
    let target = [col, row]
    const madeHit = userGameboard.receiveAttack(col, row);
    if (madeHit) {
        cells[targetCell].classList.add("hit");
        return target
    } else {
        cells[targetCell].classList.add("miss");
        return target
    }
}

//function not final - needs work
function didLastHit(userGameboard ,target) {
    //const target = [col, row]
    const hitShots = JSON.stringify(userGameboard.getHitShots())
    if (hitShots.includes(target)) {
        return target
    } else return false
}    

//function to aim around lastHit
function aimAround(lastHit) {  
    let col = lastHit[0];
    let row = lastHit[1];
    let aimArray = [];
    aimArray.push([col + 1, row],[col - 1, row],[col, row + 1], [col, row -1]);
    return aimArray
}


// add class tags hit / miss when shot taken (use receiveAttack return true/false)
// maybe use another set of classes instead for greater visual distinction between boards

// Either add memory for last shot - or add extra turn for a hit (leaning toward memory)
// if last shot was a hit, attack adjacent to last hit

//If (receiveAttack(col, row)) {let lasthit = {true, col, row}} 
// else let lasthit = {false, 0, 0}