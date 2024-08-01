import Ship from './ships';
import Player from './player';
import Gameboard from './gameboard';
import fillBotBoard from './renderBot';
import fillUserBoard from './renderUser';
import showUserShips from './showUserShips';
import { displayModal, hideModal } from './DOM';

function reset() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.remove();
    })

    hideModal()

    const user = Player(user)
    const bot = Player(bot)

    const botGameboard = new Gameboard();
    const userGameboard = new Gameboard();

    user.gameboard = userGameboard;
    bot.gameboard = botGameboard;

    const userBoard = document.querySelector('.userGameboard');
    const botBoard = document.querySelector('.botGameboard');

    fillBotBoard(botBoard, botGameboard, userGameboard);
    fillUserBoard(userBoard);
    
    populateBoardRandom(botGameboard);
    populateBoardRandom(userGameboard);

    showUserShips(userGameboard.getGameboard());
}

//clear function (same as reset without ship placement)

function clear() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.remove();
    })

    hideModal()

    const user = Player(user)
    const bot = Player(bot)

    const botGameboard = new Gameboard();
    const userGameboard = new Gameboard();

    user.gameboard = userGameboard;
    bot.gameboard = botGameboard;

    const userBoard = document.querySelector('.userGameboard');
    const botBoard = document.querySelector('.botGameboard');

    fillBotBoard(botBoard, botGameboard, userGameboard);
    fillUserBoard(userBoard, userGameboard); // 01 Aug add userGameboard parameter
    
    //populateBoardRandom(botGameboard);
    //populateBoardRandom(userGameboard);

    //01 Aug drag test
    handleDrag();

    showUserShips(userGameboard.getGameboard());
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

// handleDrop function for drag & drop 

function handleDrop(event, targetCell, userGameboard) {
    event.preventDefault();

    const length = parseInt(event.dataTransfer.getData('length'), 10);
    const shipName = event.dataTransfer.getData('name');
    const classList = event.dataTransfer.getData('classList');
    const horizontal  = !classList.includes('vertical');

    let shipObject = new Ship(shipName, length, horizontal);
    let col = targetCell % 10;
    let row = Math.floor(targetCell / 10);

    userGameboard.placeShip(shipObject, col, row);
    showUserShips(userGameboard.getGameboard());

}

function handleDrag() {
    document.querySelectorAll('.drop-ship').forEach((ship) => {
        ship.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('classList', event.currentTarget.classList);
            event.dataTransfer.setData('length', event.currentTarget.dataset.length);
            event.dataTransfer.setData('name', event.currentTarget.dataset.name);
        })
    })

}

function endGame() {
    displayModal()
}



export {
    populateBoardRandom,
    handleDrop,
    handleDrag,
    reset,
    clear,
    endGame
};