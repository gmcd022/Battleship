import './style.css';
import { reset } from './gamelogic';

const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', () => {reset()});

reset()