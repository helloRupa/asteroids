const Util = require('./utils');
const MovingObject = require('./moving_object');

function Ship(pos, game) {
  MovingObject.call(this, { 
    pos: pos, 
    color: Ship.color, 
    radius: Ship.radius, 
    vel: [0, 0],
    game: game
  });
}

Util.inherits(Ship, MovingObject);

Ship.radius = 10;
Ship.color = 'orange';
Ship.topSpeed = 20;

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  let [x, y] = this.vel;
  const [dx, dy] = impulse;
  x += dx;
  y += dy;

  if (Math.abs(x) > Ship.topSpeed) {
    x = this.vel[0];
  }

  if (Math.abs(y) > Ship.topSpeed) {
    y = this.vel[1];
  }

  this.vel = [x, y];
};

module.exports = Ship;