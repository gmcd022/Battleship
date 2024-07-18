export default function botTurn(userGameboard) {
    //if (didLastHit === false)
    
    const col = Math.floor(Math.random() * 10);
    const row = Math.floor(Math.random() * 10);

    //else col = target[0], row = target[1]
     
    if (!userGameboard.validShot(col,row)) {
        return botTurn(userGameboard);
    }

    userGameboard.receiveAttack(col, row);
    if (userGameboard.allShipsSunk()) {
        alert('Defeat!')
    }
}

//function not final - needs work
function didLastHit(col, row) {
    const target = [col, row]
    const hitShots = JSON.stringify(getAllShots())
    if (hitShots.includes(target)) {
        return target
    } else return false
}    


// add class tags hit / miss when shot taken (use receiveAttack return true/false)
// maybe use another set of classes instead for greater visual distinction between boards

// Either add memory for last shot - or add extra turn for a hit (leaning toward memory)
// if last shot was a hit, attack adjacent to last hit

//If (receiveAttack(col, row)) {let lasthit = {true, col, row}} 
// else let lasthit = {false, 0, 0}