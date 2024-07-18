import Gameboard from "./gameboard";

export default function Player(name) {
    const gameboard = Gameboard();
    return {name, gameboard}
}