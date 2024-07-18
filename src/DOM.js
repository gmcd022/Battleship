import './style.css';

import { reset } from './gamelogic';

// todo: 1.reset function - gamelogic, game over function -, 2.gameover/reset html modal, 3+.placeShips random or manually at start of game


const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', () => {reset()});

reset()