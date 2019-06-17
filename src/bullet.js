const Util = require('./utils');
const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid');
const Ship = require('./ship');

function Bullet(pos, game, vel, dir) {
  MovingObject.call(this, { 
    pos: pos, 
    color: Bullet.color, 
    radius: Bullet.radius, 
    vel: Bullet.setVelocity(vel, dir),
    game: game
  });
}

Util.inherits(Bullet, MovingObject);

Bullet.color = 'red';
Bullet.radius = 6;

Bullet.prototype.collidedWith = function (otherObject) {
  if (otherObject.constructor.name === 'Asteroid') {
    this.cleanup = true;
    otherObject.cleanup = true;
  }
};

Bullet.setVelocity = function (vel, dir) {
  let [x, y] = vel;
  const [dx, dy] = dir;

  if (dx !== 0) {
    if (Math.sign(x) !== Math.sign(dx)) x *= -1;
    if (Math.abs(x) < 5) x = dx * 5;
  } else {
    if (Math.sign(y) !== Math.sign(dy)) y *= -1;
    if (Math.abs(y) < 5) y = dy * 5;
  }

  return [x, y].map(val => Math.floor(val * 1.5));
};

Bullet.prototype.move = function () {
  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
};

module.exports = Bullet;