import './style.css';
import { reset, clear, start } from './gamelogic';

// ADD index.js as webPack entry - revert DOM.js to normal


//add these in HTML build node

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {reset()});

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', () => {clear()});

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {start()});

const modalResetButton = document.querySelector('.modal-reset-button');
modalResetButton.addEventListener('click', () => {reset()});


//this can also be in HTML build node but only after HTML built


reset();



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

export {displayModal, hideModal, rotateShips}