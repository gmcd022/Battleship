import './style.css';
import { reset, clear } from './gamelogic';

// ADD index.js as webPack entry - revert DOM.js to normal

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {reset()});

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', () => {clear()});

const modalResetButton = document.querySelector('.modal-reset-button');
modalResetButton.addEventListener('click', () => {reset()});

const rotateButton = document.querySelector('.rotate-button');
rotateButton.addEventListener('click', () => {rotateShips()});

reset();

//drag and drop functions

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData(ship)
}

function displayModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

function hideModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
}

function rotateShips() {
    const dropShip = document.querySelectorAll('.drop-ship');
    dropShip.forEach(x => x.classList.toggle('vertical'))
}

export {displayModal, hideModal}