const Asteroid = require('./asteroid');
const Ship = require('./ship');
const Bullet = require('./bullet');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this.randomPosition(), this);
  this.bullets = [];
}

Game.DIM_X = 900;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 15;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach((object) => {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function (delta) {
  this.allObjects().forEach((object) => {
    object.move(delta);
  });
};

Game.prototype.wrap = function (pos) {
  let [x, y] = pos;
  if (x > Game.DIM_X) {
    x = 0;
  } else if (x < 0) {
    x = Game.DIM_X;
  }

  if (y > Game.DIM_Y) {
    y = 0;
  } else if (y < 0) {
    y = Game.DIM_Y;
  }

  return [x, y];
};

Game.prototype.checkCollisions = function () {
  const objects = this.allObjects();

  objects.forEach((object, idx) => {
    for (let i = idx + 1; i < objects.length; i++) {
      if (object.isCollidedWith(objects[i])) {
        object.collidedWith(objects[i]);
        objects[i].collidedWith(object);
      }
    }
  });

  this.remove();
};

Game.prototype.remove = function () {
  this.asteroids = this.asteroids.filter(asteroid => !asteroid.cleanup);
  this.bullets = this.bullets.filter(bullet => !bullet.cleanup);
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.allObjects = function () {
  return [...this.asteroids].concat(this.ship).concat([...this.bullets]);
};

module.exports = Game;