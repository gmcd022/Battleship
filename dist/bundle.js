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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _gamelogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gamelogic */ \"./src/gamelogic.js\");\n\n\n\n// todo: 1.reset function - gamelogic, game over function -, 2.gameover/reset html modal, 3+.placeShips random or manually at start of game\n\nvar resetButton = document.querySelector('.resetButton');\nresetButton.addEventListener('click', function () {\n  (0,_gamelogic__WEBPACK_IMPORTED_MODULE_1__.reset)();\n});\n(0,_gamelogic__WEBPACK_IMPORTED_MODULE_1__.reset)();\n\n//# sourceURL=webpack://battleships/./src/DOM.js?");

/***/ }),

/***/ "./src/botTurn.js":
/*!************************!*\
  !*** ./src/botTurn.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ botTurn)\n/* harmony export */ });\n// I'm trying to enable smarter bot plays using last hit shots to select next shots\n// It may be easier to set \"moods\" for bot player\n// This would likely require refactoring to replace Gameboards with players for multiple functions\n\nfunction botTurn(userGameboard) {\n  //if (didLastHit === false)\n\n  var col = Math.floor(Math.random() * 10);\n  var row = Math.floor(Math.random() * 10);\n  if (!userGameboard.validShot(col, row)) {\n    return botTurn(userGameboard);\n  } else {\n    botShotTracker(userGameboard, col, row);\n    // let lastHit = didLastHit(botShotTracker(userGameboard, col, row));\n    // if (lastHit){ let aimArray = aimAround(lastHit)};\n    // new array from forEach target of aimArray - validShot()\n    // select target from array using random * array.length\n    // if lasthit = false, attack as normal with random co-ordinates\n\n    if (userGameboard.allShipsSunk()) {\n      alert('Defeat!');\n    }\n  }\n}\nfunction botShotTracker(userGameboard, col, row) {\n  var cells = document.querySelectorAll('.user-cell');\n  var targetCell = row * 10 + col;\n  var target = [col, row];\n  var madeHit = userGameboard.receiveAttack(col, row);\n  if (madeHit) {\n    cells[targetCell].classList.add(\"hit\");\n    return target;\n  } else {\n    cells[targetCell].classList.add(\"miss\");\n    return target;\n  }\n}\n\n//function not final - needs work\nfunction didLastHit(userGameboard, target) {\n  //const target = [col, row]\n  var hitShots = JSON.stringify(userGameboard.getHitShots());\n  if (hitShots.includes(target)) {\n    return target;\n  } else return false;\n}\n\n//function to aim around lastHit\nfunction aimAround(lastHit) {\n  var col = lastHit[0];\n  var row = lastHit[1];\n  var aimArray = [];\n  aimArray.push([col + 1, row], [col - 1, row], [col, row + 1], [col, row - 1]);\n  return aimArray;\n}\n\n// add class tags hit / miss when shot taken (use receiveAttack return true/false)\n// maybe use another set of classes instead for greater visual distinction between boards\n\n// Either add memory for last shot - or add extra turn for a hit (leaning toward memory)\n// if last shot was a hit, attack adjacent to last hit\n\n//If (receiveAttack(col, row)) {let lasthit = {true, col, row}} \n// else let lasthit = {false, 0, 0}\n\n//# sourceURL=webpack://battleships/./src/botTurn.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n\nfunction Gameboard() {\n  var gameboard = [];\n  var missedShots = [];\n  var hitShots = [];\n  var sunkenShips = [];\n  //const allShots = (function() {return missedShots.concat(hitShots)})();\n\n  for (var i = 0; i < 10; i++) {\n    gameboard.push(['', '', '', '', '', '', '', '', '', '']);\n  }\n  function placeShip(shipObject, x, y) {\n    var length = shipObject.shipLength;\n    var horizontal = shipObject.horizontal;\n\n    // this validDrop check redundant when using randomized ship placement\n    // still useful if using manual placement\n    if (!validDrop(x, y, length, horizontal)) {\n      throw new Error('placement invalid, entireity of ship must be in bounds');\n    }\n    for (var _i = 0; _i < length; _i++) {\n      if (horizontal) {\n        gameboard[y][x + _i] = shipObject;\n      } else {\n        gameboard[y + _i][x] = shipObject;\n      }\n    }\n    return gameboard[y][x];\n  }\n  function receiveAttack(x, y) {\n    var target = gameboard[y][x];\n    if (!validShot(x, y)) {\n      throw new Error('target invalid, cell has already been shot at or is out of bounds');\n    }\n    if (target === '') {\n      missedShots.push([x, y]);\n      return false;\n    } else {\n      target.hit();\n      hitShots.push([x, y]);\n      logSink(target);\n      return true;\n    }\n  }\n  function validShot(x, y) {\n    var allShots = JSON.stringify(getAllShots());\n    if (x >= 10 || x < 0) return false;\n    if (y >= 10 || y < 0) return false;\n    if (allShots.includes([x, y])) return false;else return true;\n  }\n  function validDrop(x, y, length, horizontal) {\n    if (horizontal) return x + length < 11;else return y + length < 11;\n  }\n  function emptyCells(shipObject, x, y) {\n    var horizontal = shipObject.horizontal;\n    var length = shipObject.shipLength;\n    if (!validDrop(x, y, length, horizontal)) {\n      return false;\n    }\n    for (var _i2 = 0; _i2 < length; _i2++) {\n      if (horizontal && gameboard[y][x + _i2] !== \"\") {\n        return false;\n      }\n      if (!horizontal && gameboard[y + _i2][x] !== \"\") {\n        return false;\n      } else continue;\n    }\n    return true;\n  }\n  function getGameboard() {\n    return gameboard;\n  }\n  function getHitShots() {\n    return hitShots;\n  }\n  function getMissedShots() {\n    return missedShots;\n  }\n  function getAllShots() {\n    return getHitShots().concat(getMissedShots());\n  }\n  function logSink(target) {\n    if (target.isSunk() && !sunkenShips.includes(target)) {\n      sunkenShips.push(target);\n    }\n    return sunkenShips;\n  }\n  function getSunkShips() {\n    return sunkenShips;\n  }\n  function allShipsSunk() {\n    if (getSunkShips().length === 5) return true;else return false;\n  }\n  return {\n    gameboard: gameboard,\n    placeShip: placeShip,\n    receiveAttack: receiveAttack,\n    getGameboard: getGameboard,\n    getHitShots: getHitShots,\n    getMissedShots: getMissedShots,\n    getAllShots: getAllShots,\n    getSunkShips: getSunkShips,\n    logSink: logSink,\n    validShot: validShot,\n    validDrop: validDrop,\n    allShipsSunk: allShipsSunk,\n    emptyCells: emptyCells\n  };\n}\n\n//# sourceURL=webpack://battleships/./src/gameboard.js?");

/***/ }),

/***/ "./src/gamelogic.js":
/*!**************************!*\
  !*** ./src/gamelogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   populateBoardRandom: () => (/* binding */ populateBoardRandom),\n/* harmony export */   populateBotBoard: () => (/* binding */ populateBotBoard),\n/* harmony export */   reset: () => (/* binding */ reset)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _renderBot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderBot */ \"./src/renderBot.js\");\n/* harmony import */ var _renderUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderUser */ \"./src/renderUser.js\");\n/* harmony import */ var _showUserShips__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./showUserShips */ \"./src/showUserShips.js\");\n\n\n\n\n\n\nfunction reset() {\n  document.querySelectorAll('.cell').forEach(function (cell) {\n    cell.remove();\n  });\n  var user = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(user);\n  var bot = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(bot);\n  var botGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  var userGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  user.gameboard = userGameboard;\n  bot.gameboard = botGameboard;\n  var userBoard = document.querySelector('.userGameboard');\n  var botBoard = document.querySelector('.botGameboard');\n  (0,_renderBot__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(botBoard, botGameboard, userGameboard); //function to create bot DOM grid\n  (0,_renderUser__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(userBoard); //function to create user DOM grid \n\n  //populateBotBoard(botGameboard); //temp function placing ships on bot board\n  populateBoardRandom(botGameboard);\n  populateBoardRandom(userGameboard); // temp function placing ships on user board\n\n  (0,_showUserShips__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(userGameboard.getGameboard());\n  return console.log(\"RESET\");\n}\nfunction populateBoardRandom(userGameboard) {\n  var direction = function direction() {\n    return Math.random() < 0.5;\n  };\n  var carrier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Carrier', 5, direction());\n  var battleship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Battleship', 4, direction());\n  var destroyer = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Destroyer', 3, direction());\n  var submarine = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Submarine', 3, direction());\n  var patrolBoat = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Patrol Boat', 2, direction());\n  var shipArray = [carrier, battleship, destroyer, submarine, patrolBoat];\n  shipArray.forEach(function (ship) {\n    var col = Math.floor(Math.random() * 10);\n    var row = Math.floor(Math.random() * 10);\n    validCoordinates(col, row, userGameboard, ship);\n  });\n}\nfunction validCoordinates(x, y, userGameboard, ship) {\n  if (userGameboard.emptyCells(ship, x, y)) {\n    userGameboard.placeShip(ship, x, y);\n  } else {\n    var a = Math.floor(Math.random() * 10);\n    var b = Math.floor(Math.random() * 10);\n    validCoordinates(a, b, userGameboard, ship);\n  }\n}\nfunction populateBotBoard(botGameboard) {\n  // fixed bot board (not in use)\n  // may be useful for troubleshooting\n\n  var carrier = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Carrier', 5, false);\n  var battleship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Battleship', 4, true);\n  var destroyer = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Destroyer', 3, false);\n  var submarine = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Submarine', 3, false);\n  var patrolBoat = (0,_ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Patrol Boat', 2, false);\n  botGameboard.placeShip(carrier, 4, 2);\n  botGameboard.placeShip(battleship, 0, 8);\n  botGameboard.placeShip(destroyer, 1, 3);\n  botGameboard.placeShip(submarine, 9, 3);\n  botGameboard.placeShip(patrolBoat, 6, 0);\n}\n\n\n//# sourceURL=webpack://battleships/./src/gamelogic.js?");

/***/ }),

/***/ "./src/hitDetector.js":
/*!****************************!*\
  !*** ./src/hitDetector.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ hitDetector)\n/* harmony export */ });\n/* harmony import */ var _botTurn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./botTurn */ \"./src/botTurn.js\");\n\nfunction hitDetector(cell, i, botGameboard, userGameboard) {\n  var row = Math.floor(i / 10);\n  var col = i % 10;\n  var madeHit = botGameboard.receiveAttack(col, row);\n  if (madeHit) {\n    cell.classList.add('hit');\n  } else {\n    cell.classList.add('miss');\n  }\n  if (botGameboard.allShipsSunk()) alert('Victory!');\n  (0,_botTurn__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(userGameboard);\n}\n\n//# sourceURL=webpack://battleships/./src/hitDetector.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fillBotBoard)\n/* harmony export */ });\n/* harmony import */ var _hitDetector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hitDetector */ \"./src/hitDetector.js\");\n\nfunction fillBotBoard(boardElement, bot, user) {\n  var _loop = function _loop(i) {\n    var cell = document.createElement('div');\n    cell.classList.add('cell');\n    cell.classList.add('bot-cell');\n    cell.addEventListener('click', function () {\n      (0,_hitDetector__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(cell, i, bot, user);\n    }, {\n      once: true\n    });\n    boardElement.appendChild(cell);\n  };\n  for (var i = 0; i < 100; i++) {\n    _loop(i);\n  }\n}\n\n//# sourceURL=webpack://battleships/./src/renderBot.js?");

/***/ }),

/***/ "./src/renderUser.js":
/*!***************************!*\
  !*** ./src/renderUser.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fillUserBoard)\n/* harmony export */ });\nfunction fillUserBoard(boardElement) {\n  for (var i = 0; i < 100; i++) {\n    var cell = document.createElement('div');\n    cell.classList.add('cell');\n    cell.classList.add('user-cell');\n    boardElement.appendChild(cell);\n  }\n}\n\n//# sourceURL=webpack://battleships/./src/renderUser.js?");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\n//change position to orientation\n\nfunction Ship(shipType, length, orientation) {\n  var hits = 0;\n  var sunk = false;\n  function hit() {\n    hits++;\n    if (hits === length) {\n      sunk = true;\n    }\n    return hits;\n  }\n  function isSunk() {\n    return sunk;\n  }\n  function hitCount() {\n    return hits;\n  }\n  function isHorizontal() {\n    return orientation;\n  }\n  return {\n    shipName: shipType,\n    shipLength: length,\n    horizontal: orientation,\n    isSunk: isSunk,\n    hit: hit,\n    hitCount: hitCount,\n    isHorizontal: isHorizontal\n  };\n}\n\n//# sourceURL=webpack://battleships/./src/ships.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\n  box-sizing: border-box;\n}\n\n#page-container {\n  display: grid;\n  grid-template-columns: 1fr max(20vw, 300px) 1fr;\n  grid-template-rows: 0.8fr 0.1fr;\n\n  height: 100%;\n}\n\n#userBoardContainer {\n  justify-self: center;\n  grid-column: 1/2;\n  grid-row: 1/2;\n}\n#botBoardContainer {\n  justify-self: center;\n  grid-column: 3/4;\n  grid-row: 1/2\n}\n\n.buttonContainer {\n  grid-column: 2/3;\n  grid-row: 2/3;\n\n  display: flex;  \n  justify-self: center;\n\n}\n\n.cell {\n  border: 1px solid black;\n  width: 10%;\n  height: 10%;\n  background-color: cornflowerblue;\n}\n\n.board {\n  width: clamp(350px, 30vw, 40vw);\n  height: clamp(350px, 30vw, 40vw);\n\n  justify-self: center;\n  align-self: center;\n\n  border:3px solid black;\n  background-color: transparent;\n\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.ship {\n  background-color: blue;\n}\n\n.hit {\n  background-color: red;\n}\n\n.miss {\n  background-color: ghostwhite;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleships/./src/style.css?./node_modules/css-loader/dist/cjs.js");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/DOM.js");
/******/ 	
/******/ })()
;