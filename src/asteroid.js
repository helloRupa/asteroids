const Util = require('./utils');
const MovingObject = require('./moving_object');

function Asteroid(pos) {
  MovingObject.call(this, { 
    pos: pos, 
    color: Asteroid.color, 
    radius: Asteroid.radius, 
    vel: Util.randomVec(10) 
  });
}

Asteroid.color = 'gray';
Asteroid.radius = 10;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;