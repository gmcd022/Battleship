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
    
    populateBotBoard(botGameboard); //temp function placing ships on bot board
    populateUserBoard(userGameboard); // temp function placing ships on user board

    showUserShips(userGameboard.getGameboard());

    return console.log("RESET");
}

function populateUserBoard(userGameboard) {
    
    let carrier = Ship('Carrier', 5, false);
    let battleship = Ship('Battleship', 4, true);
    let destroyer = Ship('Destroyer', 3, false);
    let submarine = Ship('Submarine', 3, false);
    let patrolBoat = Ship('Patrol Boat', 2, false);

    userGameboard.placeShip(carrier, 4, 2);
    userGameboard.placeShip(battleship, 0, 8);
    userGameboard.placeShip(destroyer, 1, 3);
    userGameboard.placeShip(submarine, 9, 4);
    userGameboard.placeShip(patrolBoat, 6, 0);
}

function populateBotBoard(botGameboard) {
   
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
    populateUserBoard,
    reset
};