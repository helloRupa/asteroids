function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  let dir = [0, 0];

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

    switch(charCode) {
      case 37:
        dir = [-1, 0];
        break;
      case 38:
        dir = [0, -1];
        break;
      case 39:
        dir = [1, 0];
        break;
      case 40:
        dir = [0, 1];
        break;
    }

    if (charCode === 32) {
      this.game.ship.fireBullet(dir);
    }
  };
};

module.exports = GameView;