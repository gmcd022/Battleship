import Ship from './ships';
import Player from './player';
import Gameboard from './gameboard';

import fillBotBoard from './renderBot';
import fillUserBoard from './renderUser';
import showUserShips from './showUserShips';


function reset() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.remove();
    })

    const user = Player(user)
    const bot = Player(bot)

    const botGameboard = new Gameboard();
    const userGameboard = new Gameboard();

    user.gameboard = userGameboard;
    bot.gameboard = botGameboard;

    const userBoard = document.querySelector('.userGameboard');
    const botBoard = document.querySelector('.botGameboard');

    fillBotBoard(botBoard, botGameboard, userGameboard); //function to create bot DOM grid
    fillUserBoard(userBoard); //function to create user DOM grid 
    
    //populateBotBoard(botGameboard); //temp function placing ships on bot board
    populateBoardRandom(botGameboard);
    populateBoardRandom(userGameboard); // temp function placing ships on user board

    showUserShips(userGameboard.getGameboard());

    return console.log("RESET");
}

function populateBoardRandom(userGameboard) {
    const direction = function() { return Math.random() < 0.5 }
    
    let carrier = Ship('Carrier', 5, direction());
    let battleship = Ship('Battleship', 4, direction());
    let destroyer = Ship('Destroyer', 3, direction());
    let submarine = Ship('Submarine', 3, direction());
    let patrolBoat = Ship('Patrol Boat', 2, direction());

    let shipArray = [carrier, battleship, destroyer, submarine, patrolBoat];

    shipArray.forEach((ship) => {
        const col = Math.floor(Math.random() * 10);
        const row = Math.floor(Math.random() * 10);
        validCoordinates(col, row, userGameboard, ship)
    })
    
}
function validCoordinates(x, y, userGameboard, ship) {
    if (userGameboard.emptyCells(ship, x, y)) {
        userGameboard.placeShip(ship, x, y)
    }
    else{
        let a = Math.floor(Math.random() * 10);
        let b = Math.floor(Math.random() * 10);
        validCoordinates(a, b, userGameboard, ship)
    }
}


function populateBotBoard(botGameboard) {

    // fixed bot board (not in use)
    // may be useful for troubleshooting
   
    let carrier = Ship('Carrier', 5, false);
    let battleship = Ship('Battleship', 4, true);
    let destroyer = Ship('Destroyer', 3, false);
    let submarine = Ship('Submarine', 3, false);
    let patrolBoat = Ship('Patrol Boat', 2, false);
    
    botGameboard.placeShip(carrier, 4, 2);
    botGameboard.placeShip(battleship, 0, 8);
    botGameboard.placeShip(destroyer, 1, 3);
    botGameboard.placeShip(submarine, 9, 3);
    botGameboard.placeShip(patrolBoat, 6, 0);
}



export {
    populateBotBoard,
    populateBoardRandom,
    reset
};