const Util = require('./utils');
const MovingObject = require('./moving_object');
const Ship = require('./ship');

function Asteroid(pos, game) {
  MovingObject.call(this, { 
    pos: pos, 
    color: Asteroid.color, 
    radius: Asteroid.radius, 
    vel: Util.randomVec(10),
    game: game
  });
}

Asteroid.color = 'gray';
Asteroid.radius = 10;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.move = function (delta) {
  MovingObject.prototype.move.call(this, delta);
  this.pos = this.game.wrap(this.pos);
};

Asteroid.prototype.collidedWith = function (otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};

module.exports = Asteroid;