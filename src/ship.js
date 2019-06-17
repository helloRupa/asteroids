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

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

module.exports = Ship;