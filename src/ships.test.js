Ship = require('./ships');
let MSPete;

beforeEach(() => {
    MSPete = Ship('tinny', 4)
});

test('make boat', () => {
    expect(typeof MSPete).toBe('object')
})

test('Ship methods available', () => {
    expect(typeof MSPete.isSunk).toBe('function')
})

test('ship length', () => {
    expect(MSPete.length).toBe(4)
})

// moving on to Ships functions

test('ship hit counter', () => {
    MSPete.hit();
    MSPete.hit();
    expect(MSPete.hitCount()).toBe(2)
})

test('still afloat', () => {
    MSPete.hit();
    expect(MSPete.isSunk()).toBe(false)
})

test('no longer afloat', () => {
    MSPete.hit();
    MSPete.hit();
    MSPete.hit();
    MSPete.hit();
    expect(MSPete.isSunk()).toBe(true)
})