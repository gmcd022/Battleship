import Ship from './ships';
import Player from './player';

let carrier = Ship('Carrier', 5, false);
let battleship = Ship('Battleship', 4, true);
let destroyer = Ship('Destroyer', 3, false);
let submarine = Ship('Submarine', 3, false);
let patrolBoat = Ship('Patrol Boat', 2, false);

const bot = Player('bot');
const user = Player('user');


function populateUserBoard() {
    
    user.gameboard.placeShip(carrier, 4, 2);
    user.gameboard.placeShip(battleship, 0, 8);
    user.gameboard.placeShip(destroyer, 1, 3);
    user.gameboard.placeShip(submarine, 9, 3);
    user.gameboard.placeShip(patrolBoat, 6, 0);
}

function populateBotBoard() {
    
    bot.gameboard.placeShip(carrier, 4, 2);
    bot.gameboard.placeShip(battleship, 0, 8);
    bot.gameboard.placeShip(destroyer, 1, 3);
    bot.gameboard.placeShip(submarine, 9, 3);
    bot.gameboard.placeShip(patrolBoat, 6, 0);
}
//Add reset function to this module


// I think I can delete both of these getGameboard functions
function getUserGameboard() {
    return user.gameboard.getGameboard()
}

function getBotGameboard() {
    return bot.gameboard.getGameboard()
}

export {
    populateBotBoard, 
    populateUserBoard, 
    getUserGameboard,
    getBotGameboard,
    bot,
    user,
};