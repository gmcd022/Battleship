import Gameboard from "./gameboard";
import Ship from "./ships";

export default function Player(name) {
    const gameboard = Gameboard();
    return {name, gameboard}
}