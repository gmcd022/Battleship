import './style.css';
import Ship from './ships';
import Gameboard from './gameboard';
import Player from './player';
import fillBotBoard from './renderBot';
import fillUserBoard from './renderUser';
import showUserShips from './showUserShips';
import hitDetector from './hitDetector';
import { populateBotBoard,
     populateUserBoard,  
     getUserGameboard, 
     getBotGameboard,
     bot,
     user
    } from './gamelogic';

const userBoard = document.querySelector('.userGameboard');
const botBoard = document.querySelector('.botGameboard');

// delete if not used
const userBoardContainer = document.querySelector('.userBoardContainer');
const botBoardContainer = document.querySelector('.botBoardContainer');


fillBotBoard(botBoard, bot); //function to create bot DOM grid
fillUserBoard(userBoard); //function to create user DOM grid

populateBotBoard(); //temp function placing ships on bot board
populateUserBoard(); // temp function placing ships on user board

setTimeout(showUserShips(user.gameboard.getGameboard()), 3000);