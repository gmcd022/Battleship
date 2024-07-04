function Ship(shipType, length) {
    let hits = 0
    let sunk = false

    function hit() {
        hits++;
        if (hits === length) {
            sunk = true;
        }
        return hits
    }

    function isSunk() {
        return sunk;
    }

    function hitCount() {
        return hits
    }

    return {
        shipName: shipType,
        length: length,
        get isSunk() {return isSunk},
        get hit() {return hit},
        get hitCount() {return hitCount}
    };
}

module.exports = Ship;
