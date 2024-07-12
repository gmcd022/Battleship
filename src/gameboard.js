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

    function placeShip(x, y, shipObject) {
        // will need to add errors for ships longer than one cell placed on edge (out of bounds)
        let length = shipObject.shipLength;
        let horizontal = shipObject.horizontal;
    
        for (let i = 0; i < length; i++) {
            if(horizontal){
                gameboard[x+i][y] = shipObject
            }
            else{
                gameboard[x][y+i] = shipObject
            }
        }    
        return gameboard[x][y];
    }
    

    function receiveAttack(x,y) {
        let target = gameboard[x][y];
        //check if target empty, records shot in missedShots or hitShots

        if (!validShot(x,y)) {
            throw new Error ('target invalid, cell has already been shot at or is out of bounds')
        }


        if (target === '') {
            missedShots.push([x,y]);
        }
        else{
            target.hit();
            hitShots.push([x,y]);
            logSink(target);
        }
        
        return target
    }

    function validShot(x,y) {
        let allShots = JSON.stringify(getAllShots());

        if (x >= 10 || x < 0) return false;
        if (y >= 10 || y < 0) return false;
        if (allShots.includes([x, y])) return false;
        else return true
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

    return {gameboard, placeShip, receiveAttack, getGameboard, getHitShots, getMissedShots, getAllShots, getSunkShips, logSink, validShot, allShipsSunk};
}
