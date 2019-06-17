const MovingObject = require('../src/moving_object');
const Asteroid = require('../src/asteroid');
const Game = require('../src/game');
const GameView = require('../src/game_view');

document.addEventListener('DOMContentLoaded', function(){
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const gameView = new GameView(new Game(), ctx);
  gameView.start();
});

