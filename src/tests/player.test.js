import Gameboard from'../gameboard';
import Player from'../player';
import Ship from'../ships';

test('User places Ship', () => {  
    let David = Player('David')
    let PatrolBoat = Ship('Patrol Boat', 2, true)
    David.gameboard.placeShip(1, 2, PatrolBoat)
    David.gameboard.receiveAttack(2,2)
    David.gameboard.receiveAttack(1,2)
    expect(David.gameboard.getAllShots()).toEqual([[2,2],[1,2]])
})

test('User ship receives 2 hits and sinks', () => {
    let David = Player('David')
    let PatrolBoat = Ship('Patrol Boat', 2, true)
    David.gameboard.placeShip(1, 2, PatrolBoat)
    David.gameboard.receiveAttack(2,2)
    David.gameboard.receiveAttack(1,2)
    expect(David.gameboard.getSunkShips()).toEqual([PatrolBoat])
})

test('User ship receives single hit and survives', () => {
    let David = Player('David')
    let PatrolBoat = Ship('Patrol Boat', 2, true)
    David.gameboard.placeShip(1, 2, PatrolBoat)
    David.gameboard.receiveAttack(2,2)
    David.gameboard.receiveAttack(1,1)
    expect(David.gameboard.getSunkShips()).toEqual([])
})

test('sunk all user ships', () => {
    let David = Player('David')
    let frigate = Ship('frigate', 2, true)
    let boat2 = Ship('boat2', 1, true)
    let boat3 = Ship('boat3', 1, true)
    let boat4 = Ship('boat4', 1, true)
    let boat5 = Ship('boat5', 1, true)

    David.gameboard.placeShip(7,7, boat2)
    David.gameboard.placeShip(8,8, boat3)
    David.gameboard.placeShip(8,9, boat4)
    David.gameboard.placeShip(9,9, boat5)

    David.gameboard.placeShip(1,1, frigate)

    David.gameboard.receiveAttack(7,7)
    David.gameboard.receiveAttack(8,8)
    David.gameboard.receiveAttack(8,9)
    David.gameboard.receiveAttack(9,9)

    David.gameboard.receiveAttack(2,1)
    David.gameboard.receiveAttack(1,1)
    expect(David.gameboard.allShipsSunk()).toBe(true)
})