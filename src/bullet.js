const Util = require('./utils');
const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid');
const Ship = require('./ship');

function Bullet(pos, game, vel) {
  MovingObject.call(this, { 
    pos: pos, 
    color: Bullet.color, 
    radius: Bullet.radius, 
    vel: Bullet.setVelocity(vel),
    game: game
  });
}

Util.inherits(Bullet, MovingObject);

Bullet.color = 'red';
Bullet.radius = 6;

Bullet.prototype.collidedWith = function (otherObject) {
  // instanceof would not work
  
  if (otherObject.constructor.name === 'Asteroid') {
    this.cleanup = true;
    otherObject.cleanup = true;
  }
};

Bullet.setVelocity = function (vel) {
  let [x, y] = vel;

  if (Math.abs(x) === 0 && Math.abs(y) === 0) {
    x = 5;
  }

  return [x, y].map(val => Math.floor(val * 3));
};

module.exports = Bullet;