import './style.css';
import Ship from './ships';
import Gameboard from './gameboard';
import Player from './player'


const userBoardContainer = document.querySelector('.userBoardContainer');






let currentShip
let currentCell
let currentShipLength
let currentShipBearing

let carrier = Ship('Carrier', 5, true);
let battleship = Ship('Battleship', 4, false);
let destroyer = Ship('Destroyer', 3, true);
let submarine = Ship('Submarine', 3, false);
let patrolBoat = Ship('Patrol Boat', 2, true);


const button1 = document.querySelector('.REMOVE');
button1.addEventListener('click', testFunction);

function testFunction(){
button1.textContent = "BUTTON WORKING";
};