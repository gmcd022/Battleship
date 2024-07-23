import Gameboard from '../gameboard';
import Ship from '../ships';

test('build gameboard', () => {
    expect(typeof Gameboard()).toBe('object')
})

test('gameboard array', () => {
    let newBoard = Gameboard();
    expect(Array.isArray(newBoard.gameboard)).toBe(true);
})


test('place horizontal ship on gameboard', () => {
    let testBoard = Gameboard();
    let destroyer =  Ship('destroyer', 4, true)
    testBoard.placeShip(destroyer, 0, 0)
    expect(testBoard.gameboard[0][0].shipName).toBe('destroyer')
})

test('vertical placement', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, false)
    testBoard.placeShip(frigate, 1, 2);
    expect(testBoard.receiveAttack(1,3)).toBe(true)
})

test('hit on target location', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true)
    testBoard.placeShip(frigate, 1, 2);
    testBoard.receiveAttack(2,2);
    expect(frigate.hitCount()).toBe(1)
})



test.skip('check gameboard', () => {
    let testBoard = Gameboard();
    let destroyer =  Ship('destroyer', 2, true)
    testBoard.placeShip(destroyer, 8, 9)
    expect(testBoard.getGameboard()).toBe('destroyer')
})

test('hit on target', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true)
    testBoard.placeShip(frigate, 1, 2);
    testBoard.receiveAttack(2,2);
    expect(testBoard.getHitShots()).toStrictEqual([[2,2]])
})

test('2 hits on target', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true)
    testBoard.placeShip(frigate, 1, 2);
    testBoard.receiveAttack(2,2);
    testBoard.receiveAttack(1,2);
    let expectation = testBoard.getHitShots()
    expect(expectation.sort()).toEqual([[1,2],[2,2]])
})

test('2 hits & sink', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true)
    testBoard.placeShip(frigate, 1, 2);
    testBoard.receiveAttack(2,2);
    testBoard.receiveAttack(1,2);
    expect(frigate.isSunk()).toEqual(true)
})

// I want sunk ship to log itself in sunkenShips, could call this from receiveAttack
// added function to only allow 1 copy of each Ship in sunkenShips

test('2 hits & sink', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true);
    testBoard.placeShip(frigate, 1, 2);
    testBoard.receiveAttack(2,2);
    testBoard.receiveAttack(1,2);
    expect(testBoard.logSink(frigate)).toStrictEqual([frigate])
})

// need to refine gameboard stats logging (shot counters) to prevent attacking same spot twice, attacking out of bounds etc

test('2 sunk boats', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true);
    let tinny = Ship('tinny', 1, true)
    testBoard.placeShip(frigate, 1, 2);
    testBoard.placeShip(tinny, 5, 5);
    testBoard.receiveAttack(2,2);
    testBoard.receiveAttack(1,2);
    testBoard.receiveAttack(5,5);
    expect(testBoard.logSink(frigate)).toStrictEqual([frigate, tinny])
})

test('all shots', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true);
    let tinny = Ship('tinny', 1, true)
    testBoard.placeShip(frigate, 1, 2);
    testBoard.placeShip(tinny, 5, 5);
    testBoard.receiveAttack(2,2);
    testBoard.receiveAttack(1,2);
    testBoard.receiveAttack(5,5);
    testBoard.receiveAttack(9,9);
    testBoard.receiveAttack(8,8);
    let expek = testBoard.getAllShots()
    expect(expek.sort()).toStrictEqual([[1,2],[2,2],[5,5],[8,8],[9,9]])
})

//validShot  -return true if co-ordinates are in gameboard and not in allShots

test('shot validity', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true)
    testBoard.placeShip(frigate, 1, 1);
    testBoard.receiveAttack(1,1);
    testBoard.receiveAttack(4,4);
    testBoard.receiveAttack(4,5);
    expect(testBoard.validShot(4,5)).toBe(false)
})

test('sunk all ships', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true);
    let boat2 = Ship('boat2', 1, true);
    let boat3 = Ship('boat3', 1, true);
    let boat4 = Ship('boat4', 1, true);
    let boat5 = Ship('boat5', 1, true);

    testBoard.placeShip(boat2, 7,7);
    testBoard.placeShip(boat3, 8,8);
    testBoard.placeShip(boat4, 8,9);
    testBoard.placeShip(boat5, 9,9);

    testBoard.placeShip(frigate, 1, 1);

    testBoard.receiveAttack(7,7);
    testBoard.receiveAttack(8,8);
    testBoard.receiveAttack(8,9);
    testBoard.receiveAttack(9,9);

    testBoard.receiveAttack(2,1);
    testBoard.receiveAttack(1,1);
    expect(testBoard.allShipsSunk()).toBe(true)
})

test('shot invalid', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true);
    testBoard.placeShip(frigate, 1, 2);
    testBoard.receiveAttack(2,2);
    expect(() => {testBoard.receiveAttack(2,2)}).toThrow(Error)
})

test('empty cells', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true);
    expect(testBoard.emptyCells(frigate, 0 , 0)).toBe(true);
})

test('fail empty cells', () => {
    let testBoard = Gameboard();
    let frigate = Ship('frigate', 2, true);
    let battleship = Ship('battleship', 4, false);
    testBoard.placeShip(frigate, 1, 2);
    expect(testBoard.emptyCells(battleship, 2, 1)).toBe(false);
})

//emptyCells not working properly, returning on first cell check
