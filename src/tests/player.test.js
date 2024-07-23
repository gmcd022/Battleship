import Gameboard from'../gameboard';
import Player from'../player';
import Ship from'../ships';

test('User places Ship', () => {  
    let David = Player('David')
    let PatrolBoat = Ship('Patrol Boat', 2, true)
    David.gameboard.placeShip(PatrolBoat, 1, 2)
    David.gameboard.receiveAttack(2,2)
    David.gameboard.receiveAttack(1,2)
    expect(David.gameboard.getAllShots()).toEqual([[2,2],[1,2]])
})

test('User ship receives 2 hits and sinks', () => {
    let David = Player('David')
    let PatrolBoat = Ship('Patrol Boat', 2, true)
    David.gameboard.placeShip(PatrolBoat, 1, 2)
    David.gameboard.receiveAttack(2,2)
    David.gameboard.receiveAttack(1,2)
    expect(David.gameboard.getSunkShips()).toEqual([PatrolBoat])
})

test('User ship receives single hit and survives', () => {
    let David = Player('David')
    let PatrolBoat = Ship('Patrol Boat', 2, true)
    David.gameboard.placeShip(PatrolBoat, 1, 2)
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

    David.gameboard.placeShip(boat2, 7,7)
    David.gameboard.placeShip(boat3, 8,8)
    David.gameboard.placeShip(boat4, 8,9)
    David.gameboard.placeShip(boat5, 9,9)

    David.gameboard.placeShip(frigate, 1, 1)

    David.gameboard.receiveAttack(7,7)
    David.gameboard.receiveAttack(8,8)
    David.gameboard.receiveAttack(8,9)
    David.gameboard.receiveAttack(9,9)

    David.gameboard.receiveAttack(2,1)
    David.gameboard.receiveAttack(1,1)
    expect(David.gameboard.allShipsSunk()).toBe(true)
})