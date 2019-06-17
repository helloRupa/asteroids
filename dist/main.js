/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction Asteroid(pos, game) {\n  MovingObject.call(this, { \n    pos: pos, \n    color: Asteroid.color, \n    radius: Asteroid.radius, \n    vel: Util.randomVec(10),\n    game: game\n  });\n}\n\nAsteroid.color = 'gray';\nAsteroid.radius = 10;\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collidedWith = function (otherObject) {\n  if (otherObject instanceof Ship) {\n    otherObject.relocate();\n  }\n};\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction Game() {\n  this.asteroids = [];\n  this.addAsteroids();\n  this.ship = new Ship(this.randomPosition(), this);\n}\n\nGame.DIM_X = 900;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 1;\n\nGame.prototype.addAsteroids = function () {\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    this.asteroids.push(new Asteroid(this.randomPosition(), this));\n  }\n};\n\nGame.prototype.randomPosition = function () {\n  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];\n};\n\nGame.prototype.draw = function (ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  this.allObjects().forEach((object) => {\n    object.draw(ctx);\n  });\n};\n\nGame.prototype.moveObjects = function () {\n  this.allObjects().forEach((object) => {\n    object.move();\n  });\n};\n\nGame.prototype.wrap = function (pos) {\n  let [x, y] = pos;\n  if (x > Game.DIM_X) {\n    x = 0;\n  } else if (x < 0) {\n    x = Game.DIM_X;\n  }\n\n  if (y > Game.DIM_Y) {\n    y = 0;\n  } else if (y < 0) {\n    y = Game.DIM_Y;\n  }\n\n  return [x, y];\n};\n\nGame.prototype.checkCollisions = function () {\n  const allObjects = this.allObjects();\n\n  allObjects.forEach((object, idx) => {\n    for (let i = idx + 1; i < allObjects.length; i++) {\n      if (object.isCollidedWith(allObjects[i])) {\n        object.collidedWith(allObjects[i]);\n      }\n    }\n  });\n};\n\nGame.prototype.remove = function (/*asteroid*/) {\n  return this.asteroids.filter(asteroid => !asteroid.cleanup)\n  // this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);\n};\n\nGame.prototype.step = function () {\n  this.moveObjects();\n  this.checkCollisions();\n};\n\nGame.prototype.allObjects = function () {\n  return [...this.asteroids].concat(this.ship);\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n}\n\nGameView.prototype.start = function () {\n  this.bindKeyHandlers();\n  setInterval(() => {\n    this.game.step();\n    this.game.draw(this.ctx);\n  }, 20);\n};\n\nGameView.prototype.bindKeyHandlers = function () {\n  //WASD and Arrow keys for movement\n  document.onkeydown = (e) => {\n    const keyData = e || window.event;\n    const charCode = keyData.keyCode || keyData.which;\n    const charStr = String.fromCharCode(charCode);\n\n    if (charStr === 'W' || charCode === 38) {\n      this.game.ship.power([0, -1]);\n    } else if (charStr === 'A' || charCode === 37) {\n      this.game.ship.power([-1, 0]);\n    } else if (charStr === 'S' || charCode === 40) {\n      this.game.ship.power([0, 1]);\n    } else if (charStr === 'D' || charCode === 39) {\n      this.game.ship.power([1, 0]);\n    }\n  };\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ../src/moving_object */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ../src/asteroid */ \"./src/asteroid.js\");\nconst Game = __webpack_require__(/*! ../src/game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ../src/game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', function(){\n  const canvas = document.getElementById('game-canvas');\n  const ctx = canvas.getContext('2d');\n  const gameView = new GameView(new Game(), ctx);\n  gameView.start();\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.fillStyle = this.color;\n  ctx.beginPath();\n\n  ctx.arc(\n    this.pos[0],\n    this.pos[1],\n    this.radius,\n    0,\n    2 * Math.PI,\n    false\n  );\n\n  ctx.fill();\n};\n\nMovingObject.prototype.move = function () {\n  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\n  this.pos = this.game.wrap(this.pos);\n};\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n  const [x, y] = this.pos;\n  const [otherX, otherY] = otherObject.pos;\n  const radSum = this.radius + otherObject.radius;\n\n  return Math.abs(x - otherX) < radSum && Math.abs(y - otherY) < radSum;\n};\n\nMovingObject.prototype.collidedWith = function (otherObject) {\n  \n};\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nfunction Ship(pos, game) {\n  MovingObject.call(this, { \n    pos: pos, \n    color: Ship.color, \n    radius: Ship.radius, \n    vel: [0, 0],\n    game: game\n  });\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.radius = 10;\nShip.color = 'orange';\nShip.topSpeed = 20;\n\nShip.prototype.relocate = function () {\n  this.pos = this.game.randomPosition();\n  this.vel = [0, 0];\n};\n\nShip.prototype.power = function (impulse) {\n  let [x, y] = this.vel;\n  const [dx, dy] = impulse;\n  x += dx;\n  y += dy;\n\n  if (Math.abs(x) > Ship.topSpeed) {\n    x = this.vel[0];\n  }\n\n  if (Math.abs(y) > Ship.topSpeed) {\n    y = this.vel[1];\n  }\n\n  this.vel = [x, y];\n};\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  inherits: function inherits(childClass, parentClass) {\n    childClass.prototype = Object.create(parentClass.prototype);\n    childClass.prototype.constructor = childClass;\n  },\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  }\n}\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });