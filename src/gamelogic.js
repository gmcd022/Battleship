import Ship from './ships';
import Player from './player';
import Gameboard from './gameboard';
import fillBotBoard from './renderBot';
import fillUserBoard from './renderUser';
import showUserShips from './showUserShips';
import { displayModal, hideModal } from './DOM';
import { createShipContainer, dropShipsNoDrag } from './dragDropShips';

function start() {
    const userCells = document.querySelectorAll('.user-cell');
    const shipCells = []

    for (let i =0; i < 100; i++) {
          if (userCells[i].classList.contains('ship')) {
            shipCells.push(userCells[i]);
          }
    }

    if (shipCells.length === 17) {
        const cells = document.querySelectorAll('.bot-cell');
        for (let i =0; i < 100; i++) {
            cells[i].classList.remove('inactive');
    }

    const startButton = document.querySelector('.start-button');
    startButton.classList.add('started');

    }else alert('All Ships must be placed before game start')
    
}

function reset() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.remove();
    })

    hideModal()
    createShipContainer();
    dropShipsNoDrag();

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

    const cells = document.querySelectorAll('.bot-cell');
    for (let i =0; i < 100; i++) {
            cells[i].classList.add('inactive');
    }

    const startButton = document.querySelector('.start-button');
    startButton.classList.remove('started');
    
    populateBoardRandom(botGameboard);
    populateBoardRandom(userGameboard);

    showUserShips(userGameboard.getGameboard());
}

function clear() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.remove();
    })

    hideModal();
    createShipContainer();

    const user = Player(user)
    const bot = Player(bot)

    const botGameboard = new Gameboard();
    const userGameboard = new Gameboard();

    user.gameboard = userGameboard;
    bot.gameboard = botGameboard;

    const userBoard = document.querySelector('.userGameboard');
    const botBoard = document.querySelector('.botGameboard');

    fillBotBoard(botBoard, botGameboard, userGameboard);
    fillUserBoard(userBoard, userGameboard);

    // disable bot-cells until game started
    const cells = document.querySelectorAll('.bot-cell');
    for (let i =0; i < 100; i++) {
            cells[i].classList.add('inactive');
    }

    // remove 'started' class from start-button
    const startButton = document.querySelector('.start-button');
    startButton.classList.remove('started');

    populateBoardRandom(botGameboard);
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

// if provided co-ordinates are valid ships are placed, else it randomizes co-ordinates until valid 
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

function handleDrop(event, targetCell, userGameboard) {
    event.preventDefault();

    const length = parseInt(event.dataTransfer.getData('length'), 10);
    const shipName = event.dataTransfer.getData('name');
    const classList = event.dataTransfer.getData('classList');
    const horizontal  = !classList.includes('vertical');

    let shipObject = new Ship(shipName, length, horizontal);
    let col = targetCell % 10;
    let row = Math.floor(targetCell / 10);

    if (userGameboard.emptyCells(shipObject, col, row)) {
        userGameboard.placeShip(shipObject, col, row);
        showUserShips(userGameboard.getGameboard());

        //delete HTML element on drop here
        let droppedShip = document.querySelector(`.drop-ship[data-name="${ shipName }"]`);
        droppedShip.remove()

    } else return
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

function endGame(winner) {

    if(winner === 'user'){
        const modalMessage = document.querySelector('.end-screen');
        modalMessage.innerHTML = "VICTORY!"
        const modal = document.querySelector('.modal');
        modal.classList.add('greenBackground');
        displayModal();
    }
    

    if(winner === 'bot'){
        const modalMessage = document.querySelector('.end-screen');
        modalMessage.innerHTML = "DEFEAT!"
        const modal = document.querySelector('.modal');
        modal.classList.add('redBackground');
        displayModal();
    }
}



export {
    populateBoardRandom,
    handleDrop,
    handleDrag,
    reset,
    clear,
    start,
    endGame
};