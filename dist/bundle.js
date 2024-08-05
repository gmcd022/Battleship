/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayModal: () => (/* binding */ displayModal),\n/* harmony export */   hideModal: () => (/* binding */ hideModal),\n/* harmony export */   rotateShips: () => (/* binding */ rotateShips)\n/* harmony export */ });\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _gamelogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gamelogic */ \"./src/gamelogic.js\");\n\n\n\n// ADD index.js as webPack entry - revert DOM.js to normal\n\n//add these in HTML build node\n\nvar resetButton = document.querySelector('.reset-button');\nresetButton.addEventListener('click', function () {\n  (0,_gamelogic__WEBPACK_IMPORTED_MODULE_1__.reset)();\n});\nvar clearButton = document.querySelector('.clear-button');\nclearButton.addEventListener('click', function () {\n  (0,_gamelogic__WEBPACK_IMPORTED_MODULE_1__.clear)();\n});\nvar startButton = document.querySelector('.start-button');\nstartButton.addEventListener('click', function () {\n  (0,_gamelogic__WEBPACK_IMPORTED_MODULE_1__.start)();\n});\nvar modalResetButton = document.querySelector('.modal-reset-button');\nmodalResetButton.addEventListener('click', function () {\n  (0,_gamelogic__WEBPACK_IMPORTED_MODULE_1__.reset)();\n});\n\n//this can also be in HTML build node but only after HTML built\n\n(0,_gamelogic__WEBPACK_IMPORTED_MODULE_1__.reset)();\nfunction displayModal() {\n  var modal = document.querySelector('.modal');\n  modal.style.display = 'block';\n}\nfunction hideModal() {\n  var modal = document.querySelector('.modal');\n  modal.style.display = 'none';\n}\nfunction rotateShips() {\n  var dropShip = document.querySelectorAll('.drop-ship');\n  dropShip.forEach(function (x) {\n    return x.classList.toggle('vertical');\n  });\n}\n\n\n//# sourceURL=webpack://battleships/./src/DOM.js?");

/***/ }),

/***/ "./src/botTurn.js":
/*!************************!*\
  !*** ./src/botTurn.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ botTurn)\n/* harmony export */ });\n/* harmony import */ var _gamelogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gamelogic */ \"./src/gamelogic.js\");\n\nfunction botTurn(userGameboard) {\n  var col = Math.floor(Math.random() * 10);\n  var row = Math.floor(Math.random() * 10);\n  var targetedArray = userGameboard.getTargetedArray();\n  if (targetedArray.length > 0) {\n    var index = Math.floor(Math.random() * targetedArray.length);\n    var target = targetedArray.splice(index, 1);\n    var targetCol = target[0][0];\n    var targetRow = target[0][1];\n    if (!userGameboard.validShot(targetCol, targetRow)) {\n      return botTurn(userGameboard);\n    } else {\n      botShotTracker(userGameboard, targetCol, targetRow);\n      var _target = userGameboard.gameboard[targetRow][targetCol];\n      if (userGameboard.isTargetSunk(_target)) {\n        userGameboard.overwriteTargetedArray([]);\n        // this dumps targeted array when a ship is sunk\n        // in some instances this is worse, mostly better\n      }\n      if (userGameboard.allShipsSunk()) {\n        (0,_gamelogic__WEBPACK_IMPORTED_MODULE_0__.endGame)('bot');\n      }\n    }\n  } else if (!userGameboard.validShot(col, row)) {\n    return botTurn(userGameboard);\n  } else {\n    botShotTracker(userGameboard, col, row);\n    if (userGameboard.allShipsSunk()) {\n      (0,_gamelogic__WEBPACK_IMPORTED_MODULE_0__.endGame)('bot');\n    }\n  }\n}\nfunction botShotTracker(userGameboard, col, row) {\n  var cells = document.querySelectorAll('.user-cell');\n  var targetCell = row * 10 + col;\n  var madeHit = userGameboard.receiveAttack(col, row);\n  if (madeHit) {\n    cells[targetCell].classList.add(\"hit\");\n    var _Array = focusTarget(col, row);\n    userGameboard.setTargetedArray(_Array);\n    return true;\n  } else {\n    cells[targetCell].classList.add(\"miss\");\n    return false; //changed to false from target (unused at this point)\n  }\n}\nfunction focusTarget(col, row) {\n  var targetedArray = [];\n  if (col + 1 < 10) targetedArray.push([col + 1, row]);\n  if (col - 1 >= 0) targetedArray.push([col - 1, row]);\n  if (row + 1 < 10) targetedArray.push([col, row + 1]);\n  if (row - 1 >= 0) targetedArray.push([col, row - 1]);\n  return targetedArray;\n}\n\n//# sourceURL=webpack://battleships/./src/botTurn.js?");

/***/ }),

/***/ "./src/dragDropShips.js":
/*!******************************!*\
  !*** ./src/dragDropShips.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createShipContainer: () => (/* binding */ createShipContainer),\n/* harmony export */   dropShipsNoDrag: () => (/* binding */ dropShipsNoDrag)\n/* harmony export */ });\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\nvar fleetArray = [['Carrier', 5], ['Battleship', 4], ['Destroyer', 3], ['Submarine', 3], ['Patrol Boat', 2]];\nfunction createShipContainer() {\n  var deleteContainer = document.querySelector('.ship-container');\n  if (deleteContainer) {\n    deleteContainer.remove();\n  }\n  ;\n  var shipContainer = document.createElement('div');\n  shipContainer.classList.add('ship-container');\n  var shipContainerTitle = document.createElement('h2');\n  shipContainerTitle.innerHTML = 'Place your Ships';\n  var rotateButton = document.createElement('button');\n  rotateButton.classList.add('rotate-button');\n  rotateButton.classList.add('button');\n  rotateButton.innerHTML = 'Rotate Ships';\n  rotateButton.addEventListener('click', function () {\n    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.rotateShips)();\n  });\n  shipContainer.appendChild(shipContainerTitle);\n  shipContainer.appendChild(rotateButton);\n  Object.entries(fleetArray).forEach(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n      i = _ref2[0],\n      ship = _ref2[1];\n    var shipName = ship[0];\n    var shipLength = ship[1];\n    var shipElement = document.createElement('div');\n    shipElement.classList.add('drop-ship');\n    shipElement.draggable = true;\n    shipElement.dataset.name = shipName;\n    shipElement.dataset.length = shipLength;\n    for (var _i = 0; _i < shipLength; _i++) {\n      var cell = document.createElement('div');\n      cell.classList.add('ship-cell');\n      shipElement.appendChild(cell);\n    }\n    shipContainer.appendChild(shipElement);\n  });\n  var wrapper = document.querySelector('.ship-container-wrapper');\n  wrapper.appendChild(shipContainer);\n}\n;\nfunction dropShipsNoDrag() {\n  document.querySelectorAll('.drop-ship').forEach(function (dropShip) {\n    dropShip.draggable = false;\n  });\n}\n\n\n//# sourceURL=webpack://battleships/./src/dragDropShips.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nfunction Gameboard() {\n  var gameboard = [];\n  var missedShots = [];\n  var hitShots = [];\n  var sunkenShips = [];\n  var targetedArray = [];\n  for (var i = 0; i < 10; i++) {\n    gameboard.push(['', '', '', '', '', '', '', '', '', '']);\n  }\n  function setTargetedArray(Array) {\n    targetedArray = targetedArray.concat(Array);\n    return targetedArray;\n  }\n  function getTargetedArray() {\n    return targetedArray;\n  }\n  function overwriteTargetedArray(Array) {\n    targetedArray = Array;\n    return targetedArray;\n  }\n  function placeShip(shipObject, x, y) {\n    var length = shipObject.shipLength;\n    var horizontal = shipObject.horizontal;\n    if (!validDrop(x, y, length, horizontal)) {\n      // this validDrop check redundant when using randomized ship placement (still useful if using manual placement)\n      throw new Error('placement invalid, entireity of ship must be in bounds');\n    }\n    for (var _i = 0; _i < length; _i++) {\n      if (horizontal) {\n        gameboard[y][x + _i] = shipObject;\n      } else {\n        gameboard[y + _i][x] = shipObject;\n      }\n    }\n    return gameboard[y][x];\n  }\n  function receiveAttack(x, y) {\n    var target = gameboard[y][x];\n    if (!validShot(x, y)) {\n      throw new Error('target invalid, cell has already been shot at or is out of bounds');\n    }\n    if (target === '') {\n      missedShots.push([x, y]);\n      return false;\n    } else {\n      target.hit();\n      hitShots.push([x, y]);\n      logSink(target);\n      return true;\n    }\n  }\n  function validShot(x, y) {\n    var allShots = JSON.stringify(getAllShots());\n    if (x >= 10 || x < 0) return false;\n    if (y >= 10 || y < 0) return false;\n    if (allShots.includes([x, y])) return false;else return true;\n  }\n  function validDrop(x, y, length, horizontal) {\n    if (horizontal) return x + length < 11;else return y + length < 11;\n  }\n  function emptyCells(shipObject, x, y) {\n    var horizontal = shipObject.horizontal;\n    var length = shipObject.shipLength;\n    if (!validDrop(x, y, length, horizontal)) {\n      return false;\n    }\n    for (var _i2 = 0; _i2 < length; _i2++) {\n      if (horizontal && gameboard[y][x + _i2] !== \"\") {\n        return false;\n      }\n      if (!horizontal && gameboard[y + _i2][x] !== \"\") {\n        return false;\n      } else continue;\n    }\n    return true;\n  }\n  function getGameboard() {\n    return gameboard;\n  }\n  function getHitShots() {\n    return hitShots;\n  }\n  function getMissedShots() {\n    return missedShots;\n  }\n  function getAllShots() {\n    return getHitShots().concat(getMissedShots());\n  }\n  function logSink(target) {\n    if (target.isSunk() && !sunkenShips.includes(target)) {\n      sunkenShips.push(target);\n    }\n    return sunkenShips;\n  }\n  function getSunkShips() {\n    return sunkenShips;\n  }\n  function allShipsSunk() {\n    if (getSunkShips().length === 5) return true;else return false;\n  }\n  function isTargetSunk(target) {\n    if (getSunkShips().includes(target)) {\n      return true;\n    } else return false;\n  }\n  return {\n    gameboard: gameboard,\n    placeShip: placeShip,\n    receiveAttack: receiveAttack,\n    getGameboard: getGameboard,\n    getHitShots: getHitShots,\n    getMissedShots: getMissedShots,\n    getAllShots: getAllShots,\n    getSunkShips: getSunkShips,\n    isTargetSunk: isTargetSunk,\n    logSink: logSink,\n    validShot: validShot,\n    validDrop: validDrop,\n    allShipsSunk: allShipsSunk,\n    emptyCells: emptyCells,\n    setTargetedArray: setTargetedArray,\n    getTargetedArray: getTargetedArray,\n    overwriteTargetedArray: overwriteTargetedArray\n  };\n}\n\n//# sourceURL=webpack://battleships/./src/gameboard.js?");

/***/ }),

/***/ "./src/gamelogic.js":
/*!**************************!*\
  !*** ./src/gamelogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clear: () => (/* binding */ clear),\n/* harmony export */   endGame: () => (/* binding */ endGame),\n/* harmony export */   handleDrag: () => (/* binding */ handleDrag),\n/* harmony export */   handleDrop: () => (/* binding */ handleDrop),\n/* harmony export */   populateBoardRandom: () => (/* binding */ populateBoardRandom),\n/* harmony export */   reset: () => (/* binding */ reset),\n/* harmony export */   start: () => (/* binding */ start)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _renderBot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderBot */ \"./src/renderBot.js\");\n/* harmony import */ var _renderUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderUser */ \"./src/renderUser.js\");\n/* harmony import */ var _showUserShips__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./showUserShips */ \"./src/showUserShips.js\");\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n/* harmony import */ var _dragDropShips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dragDropShips */ \"./src/dragDropShips.js\");\n\n\n\n\n\n\n\n\nfunction start() {\n  var userCells = document.querySelectorAll('.user-cell');\n  var shipCells = [];\n  for (var i = 0; i < 100; i++) {\n    if (userCells[i].classList.contains('ship')) {\n      shipCells.push(userCells[i]);\n    }\n  }\n  if (shipCells.length === 17) {\n    var cells = document.querySelectorAll('.bot-cell');\n    for (var _i = 0; _i < 100; _i++) {\n      cells[_i].classList.remove('inactive');\n    }\n    var startButton = document.querySelector('.start-button');\n    startButton.classList.add('started');\n  } else alert('All Ships must be placed before game start');\n}\nfunction reset() {\n  document.querySelectorAll('.cell').forEach(function (cell) {\n    cell.remove();\n  });\n  (0,_DOM__WEBPACK_IMPORTED_MODULE_6__.hideModal)();\n  (0,_dragDropShips__WEBPACK_IMPORTED_MODULE_7__.createShipContainer)();\n  (0,_dragDropShips__WEBPACK_IMPORTED_MODULE_7__.dropShipsNoDrag)();\n  var user = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(user);\n  var bot = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(bot);\n  var botGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  var userGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  user.gameboard = userGameboard;\n  bot.gameboard = botGameboard;\n  var userBoard = document.querySelector('.userGameboard');\n  var botBoard = document.querySelector('.botGameboard');\n  (0,_renderBot__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(botBoard, botGameboard, userGameboard);\n  (0,_renderUser__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(userBoard);\n  var cells = document.querySelectorAll('.bot-cell');\n  for (var i = 0; i < 100; i++) {\n    cells[i].classList.add('inactive');\n  }\n  var startButton = document.querySelector('.start-button');\n  startButton.classList.remove('started');\n  populateBoardRandom(botGameboard);\n  populateBoardRandom(userGameboard);\n  (0,_showUserShips__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(userGameboard.getGameboard());\n}\nfunction clear() {\n  document.querySelectorAll('.cell').forEach(function (cell) {\n    cell.remove();\n  });\n  (0,_DOM__WEBPACK_IMPORTED_MODULE_6__.hideModal)();\n  (0,_dragDropShips__WEBPACK_IMPORTED_MODULE_7__.createShipContainer)();\n  var user = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(user);\n  var bot = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(bot);\n  var botGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  var userGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  user.gameboard = userGameboard;\n  bot.gameboard = botGameboard;\n  var userBoard = document.querySelector('.userGameboard');\n  var botBoard = document.querySelector('.botGameboard');\n  (0,_renderBot__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(botBoard, botGameboard, userGameboard);\n  (0,_renderUser__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(userBoard, userGameboard);\n\n  // disable bot-cells until game started\n  var cells = document.querySelectorAll('.bot-cell');\n  for (var i = 0; i < 100; i++) {\n    cells[i].classList.add('inactive');\n  }\n\n  // remove 'started' class from start-button\n  var startButton = document.querySelector('.start-button');\n  startButton.classList.remove('started');\n  populateBoardRandom(botGameboard);\n  handleDrag();\n  (0,_showUserShips__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(userGameboard.getGameboard());\n}\nfunction populateBoardRandom(userGameboard) {\n  var direction = function direction() {\n    return Math.random() < 0.5;\n  };\n  var carrier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Carrier', 5, direction());\n  var battleship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Battleship', 4, direction());\n  var destroyer = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Destroyer', 3, direction());\n  var submarine = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Submarine', 3, direction());\n  var patrolBoat = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Patrol Boat', 2, direction());\n  var shipArray = [carrier, battleship, destroyer, submarine, patrolBoat];\n  shipArray.forEach(function (ship) {\n    var col = Math.floor(Math.random() * 10);\n    var row = Math.floor(Math.random() * 10);\n    validCoordinates(col, row, userGameboard, ship);\n  });\n}\n\n// if provided co-ordinates are valid ships are placed, else it randomizes co-ordinates until valid \nfunction validCoordinates(x, y, userGameboard, ship) {\n  if (userGameboard.emptyCells(ship, x, y)) {\n    userGameboard.placeShip(ship, x, y);\n  } else {\n    var a = Math.floor(Math.random() * 10);\n    var b = Math.floor(Math.random() * 10);\n    validCoordinates(a, b, userGameboard, ship);\n  }\n}\nfunction handleDrop(event, targetCell, userGameboard) {\n  event.preventDefault();\n  var length = parseInt(event.dataTransfer.getData('length'), 10);\n  var shipName = event.dataTransfer.getData('name');\n  var classList = event.dataTransfer.getData('classList');\n  var horizontal = !classList.includes('vertical');\n  var shipObject = new _ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"](shipName, length, horizontal);\n  var col = targetCell % 10;\n  var row = Math.floor(targetCell / 10);\n  if (userGameboard.emptyCells(shipObject, col, row)) {\n    userGameboard.placeShip(shipObject, col, row);\n    (0,_showUserShips__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(userGameboard.getGameboard());\n\n    //delete HTML element on drop here\n    var droppedShip = document.querySelector(\".drop-ship[data-name=\\\"\".concat(shipName, \"\\\"]\"));\n    droppedShip.remove();\n  } else return;\n}\nfunction handleDrag() {\n  document.querySelectorAll('.drop-ship').forEach(function (ship) {\n    ship.addEventListener('dragstart', function (event) {\n      event.dataTransfer.setData('classList', event.currentTarget.classList);\n      event.dataTransfer.setData('length', event.currentTarget.dataset.length);\n      event.dataTransfer.setData('name', event.currentTarget.dataset.name);\n    });\n  });\n}\nfunction endGame(winner) {\n  if (winner === 'user') {\n    var modalMessage = document.querySelector('.end-screen');\n    modalMessage.innerHTML = \"VICTORY!\";\n    var modal = document.querySelector('.modal');\n    modal.classList.add('greenBackground');\n    (0,_DOM__WEBPACK_IMPORTED_MODULE_6__.displayModal)();\n  }\n  if (winner === 'bot') {\n    var _modalMessage = document.querySelector('.end-screen');\n    _modalMessage.innerHTML = \"DEFEAT!\";\n    var _modal = document.querySelector('.modal');\n    _modal.classList.add('redBackground');\n    (0,_DOM__WEBPACK_IMPORTED_MODULE_6__.displayModal)();\n  }\n}\n\n\n//# sourceURL=webpack://battleships/./src/gamelogic.js?");

/***/ }),

/***/ "./src/hitDetector.js":
/*!****************************!*\
  !*** ./src/hitDetector.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ hitDetector)\n/* harmony export */ });\n/* harmony import */ var _botTurn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./botTurn */ \"./src/botTurn.js\");\n/* harmony import */ var _gamelogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gamelogic */ \"./src/gamelogic.js\");\n\n\nfunction hitDetector(cell, i, botGameboard, userGameboard) {\n  var row = Math.floor(i / 10);\n  var col = i % 10;\n  var madeHit = botGameboard.receiveAttack(col, row);\n  if (madeHit) {\n    cell.classList.add('hit');\n  } else {\n    cell.classList.add('miss');\n  }\n  if (botGameboard.allShipsSunk()) {\n    (0,_gamelogic__WEBPACK_IMPORTED_MODULE_1__.endGame)('user');\n  }\n  (0,_botTurn__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(userGameboard);\n}\n\n//# sourceURL=webpack://battleships/./src/hitDetector.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\nfunction Player(name) {\n  var gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  return {\n    name: name,\n    gameboard: gameboard\n  };\n}\n\n//# sourceURL=webpack://battleships/./src/player.js?");

/***/ }),

/***/ "./src/renderBot.js":
/*!**************************!*\
  !*** ./src/renderBot.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fillBotBoard)\n/* harmony export */ });\n/* harmony import */ var _hitDetector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hitDetector */ \"./src/hitDetector.js\");\n\nfunction fillBotBoard(boardElement, botGameboard, userGameboard) {\n  var _loop = function _loop(i) {\n    var cell = document.createElement('div');\n    cell.classList.add('cell');\n    cell.classList.add('bot-cell');\n    cell.addEventListener('click', function () {\n      (0,_hitDetector__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(cell, i, botGameboard, userGameboard);\n    }, {\n      once: true\n    });\n    boardElement.appendChild(cell);\n  };\n  for (var i = 0; i < 100; i++) {\n    _loop(i);\n  }\n}\n\n//# sourceURL=webpack://battleships/./src/renderBot.js?");

/***/ }),

/***/ "./src/renderUser.js":
/*!***************************!*\
  !*** ./src/renderUser.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fillUserBoard)\n/* harmony export */ });\n/* harmony import */ var _gamelogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gamelogic */ \"./src/gamelogic.js\");\n\nfunction fillUserBoard(boardElement, userGameboard) {\n  var _loop = function _loop(i) {\n    var cell = document.createElement('div');\n    cell.classList.add('cell');\n    cell.classList.add('user-cell');\n    // add eventListeners for drag & drop\n    cell.addEventListener('dragover', function (event) {\n      return event.preventDefault();\n    });\n    cell.addEventListener('drop', function (event) {\n      return (0,_gamelogic__WEBPACK_IMPORTED_MODULE_0__.handleDrop)(event, i, userGameboard);\n    });\n    boardElement.appendChild(cell);\n  };\n  for (var i = 0; i < 100; i++) {\n    _loop(i);\n  }\n}\n\n//# sourceURL=webpack://battleships/./src/renderUser.js?");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nfunction Ship(shipType, length, orientation) {\n  var hits = 0;\n  var sunk = false;\n  function hit() {\n    hits++;\n    if (hits === length) {\n      sunk = true;\n    }\n    return hits;\n  }\n  function isSunk() {\n    return sunk;\n  }\n  function hitCount() {\n    return hits;\n  }\n  function isHorizontal() {\n    return orientation;\n  }\n  return {\n    shipName: shipType,\n    shipLength: length,\n    horizontal: orientation,\n    isSunk: isSunk,\n    hit: hit,\n    hitCount: hitCount,\n    isHorizontal: isHorizontal\n  };\n}\n\n//# sourceURL=webpack://battleships/./src/ships.js?");

/***/ }),

/***/ "./src/showUserShips.js":
/*!******************************!*\
  !*** ./src/showUserShips.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ showUserShips)\n/* harmony export */ });\nfunction showUserShips(gameboard) {\n  var cells = document.querySelectorAll('.user-cell');\n  for (var i = 0; i < 100; i++) {\n    if (gameboard[Math.floor(i / 10)][i % 10] !== '') {\n      cells[i].classList.add('ship');\n    }\n  }\n}\n\n//# sourceURL=webpack://battleships/./src/showUserShips.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\n  box-sizing: border-box;\n}\n\n#page-container {\n  display: grid;\n  grid-template-columns: 1fr max(20vw, 300px) 1fr;\n  grid-template-rows: 0.8fr 0.1fr;\n\n  height: 100%;\n}\n\n#userBoardContainer {\n  justify-self: center;\n  grid-column: 1/2;\n  grid-row: 1/2;\n}\n\n#botBoardContainer {\n  justify-self: center;\n  grid-column: 3/4;\n  grid-row: 1/2\n}\n\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  align-content: center;\n}\n\n.button-container {\n  grid-column: 2/3;\n  grid-row: 2/3;\n\n  display: flex;  \n  justify-self: center;\n\n}\n\n.ship-container-wrapper {\n  grid-column: 2/3;\n  grid-row: 1/2;\n}\n\n.ship-container {\n  gap: 10px;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  justify-items: center;\n  align-items: center;\n}\n\n.ship-container:has(.drop-ship.vertical) {\n  flex-direction: row;\n  width: 100%;\n  justify-content: center;\n}\n\n.rotate-button {\n  width: 100%;\n  height: 70px;\n}\n\n.drop-ship {\n  display: flex;\n  flex-direction: row;\n  cursor: pointer;\n  align-self: center;\n  justify-self: center;\n\n}\n\n.drop-ship.vertical {\n  flex-direction: column;\n  align-self: center;\n}\n\n.ship-cell {\n  border: 1px solid black;\n  width: 50px;\n  height: 50px;\n  background-color: blue;\n}\n\n.bot-cell.inactive {\n  pointer-events: none;\n}\n\n.cell {\n  border: 1px solid black;\n  width: 10%;\n  height: 10%;\n  background-color: cornflowerblue;\n}\n\n.cell:hover {\n  cursor: pointer;\n  border: 3px solid aquamarine ;\n}\n\n.board {\n  width: clamp(350px, 30vw, 40vw);\n  height: clamp(350px, 30vw, 40vw);\n\n  justify-self: center;\n  align-self: center;\n\n  border:3px solid black;\n  background-color: transparent;\n\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.ship {\n  background-color: blue;\n}\n\n.hit {\n  background-color: red;\n}\n\n.miss {\n  background-color: ghostwhite;\n}\n\n.started {\n  background-color: greenyellow;\n}\n\n.end-screen {\n  color: black;\n\n}\n\n.modal-content {\n  position: relative;\n  left: calc(50vw - 80px);\n  bottom: 150px;\n  width: fit-content;\n}\n\n.modal-reset-button {\n  position: relative;\n  left: 45px;\n}\n\n\n.greenBackground {\n  background-color: rgba(0, 255, 0, 0.8);\n}\n\n.redBackground {\n  background-color: rgba(255, 0, 0, 0.8);\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleships/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleships/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleships/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleships/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/DOM.js");
/******/ 	
/******/ })()
;