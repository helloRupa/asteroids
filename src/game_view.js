function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.lastTime = 0;
}

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  requestAnimationFrame(() => {
    this.animate();
  });
};

GameView.prototype.animate = function () {
  requestAnimationFrame((ts) => {
    let delta = ts - this.lastTime;
    this.game.moveObjects(delta /  20);
    this.game.checkCollisions();
    this.game.draw(this.ctx);
    this.lastTime = ts;
    this.animate(ts);
  });
};

GameView.prototype.bindKeyHandlers = function () {
  //WASD and Arrow keys for movement
  document.onkeydown = (e) => {
    const keyData = e || window.event;
    const charCode = keyData.keyCode || keyData.which;
    const charStr = String.fromCharCode(charCode);

    if (charStr === 'W') {
      this.game.ship.power([0, -1]);
    } else if (charStr === 'A') {
      this.game.ship.power([-1, 0]);
    } else if (charStr === 'S') {
      this.game.ship.power([0, 1]);
    } else if (charStr === 'D') {
      this.game.ship.power([1, 0]);
    }

    if (charCode === 32) {
      this.game.ship.fireBullet();
      e.preventDefault();
    }
  };
};

module.exports = GameView;