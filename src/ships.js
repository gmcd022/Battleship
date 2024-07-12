//change position to orientation

export default function Ship(shipType, length, orientation) {
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

    function isHorizontal() {
        return orientation
    }

    return {
        shipName: shipType,
        shipLength: length,
        horizontal: orientation,
        isSunk,
        hit,
        hitCount,
        isHorizontal
    };
}
