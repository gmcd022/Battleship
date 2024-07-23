import Ship from './ships';

export default function Gameboard() {
    let gameboard = [];
    let missedShots = [];
    let hitShots = [];
    let sunkenShips = [];
    //const allShots = (function() {return missedShots.concat(hitShots)})();
    
    
    for (let i = 0; i < 10; i++) {
        gameboard.push(['','','','','','','','','',''])
    }

    function placeShip(shipObject, x, y) {
        let length = shipObject.shipLength;
        let horizontal = shipObject.horizontal;

        // this validDrop check redundant when using randomized ship placement
        // still useful if using manual placement
        if (!validDrop(x, y, length, horizontal)) {
            throw new Error ('placement invalid, entireity of ship must be in bounds')
        }
    
        for (let i = 0; i < length; i++) {
            if(horizontal){
                gameboard[y][x+i] = shipObject
            }
            else{
                gameboard[y+i][x] = shipObject
            }
        }    
        return gameboard[y][x];

    }
    
    function receiveAttack(x, y) {
        let target = gameboard[y][x];

        if (!validShot(x,y)) {
            throw new Error ('target invalid, cell has already been shot at or is out of bounds')
        }
        if (target === '') {
            missedShots.push([x,y]);
            return false
        }
        else{
            target.hit();
            hitShots.push([x,y]);
            logSink(target);
            return true
        }
    }

    function validShot(x,y) {
        let allShots = JSON.stringify(getAllShots());

        if (x >= 10 || x < 0) return false;
        if (y >= 10 || y < 0) return false;
        if (allShots.includes([x, y])) return false;
        else return true
    }

    function validDrop(x, y, length, horizontal) {
        if (horizontal) return x + length < 11;
        else return y + length < 11
    }

    function emptyCells(shipObject, x , y) {
        let horizontal  = shipObject.horizontal;
        let length = shipObject.shipLength;

        if (!validDrop(x, y, length, horizontal)) {
            return false
        }

        for (let i = 0; i < length; i++) {
            if (horizontal && (gameboard[y][x+i] !== "")) {
                return false
            } if (!horizontal && (gameboard[y+i][x] !== "")) {
                return false
            } else continue
        }
        return true
    }

    function getGameboard() {
        return gameboard
    }

    function getHitShots() {
        return hitShots
    }

    function getMissedShots() {
        return missedShots
    }

    function getAllShots() {
       return getHitShots().concat(getMissedShots())
    }

    function logSink(target) {
        if (target.isSunk() && !sunkenShips.includes(target)) {
            sunkenShips.push(target);
        } 
        return sunkenShips
    }

    function getSunkShips() {
        return sunkenShips
    }

    function allShipsSunk() {
        if (getSunkShips().length === 5) return true;
        else return false
    }

    return {
        gameboard, 
        placeShip, 
        receiveAttack, 
        getGameboard, 
        getHitShots, 
        getMissedShots, 
        getAllShots, 
        getSunkShips, 
        logSink, 
        validShot, 
        validDrop, 
        allShipsSunk,
        emptyCells
    };
}
