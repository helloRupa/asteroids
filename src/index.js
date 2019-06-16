const MovingObject = require('../src/moving_object.js');
window.MovingObject = MovingObject;

document.addEventListener('DOMContentLoaded', function(){
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  m = new MovingObject({
    pos: [50, 50],
    radius: 10,
    color: 'orange',
    vel: [10, 10]
  });

  m.draw(ctx);
  setTimeout(() => {
    m.move();
    m.draw(ctx);
  }, 1000);
});

