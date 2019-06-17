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
  //WASD and Arrow keys for movement
  document.onkeydown = (e) => {
    const keyData = e || window.event;
    const charCode = keyData.keyCode || keyData.which;
    const charStr = String.fromCharCode(charCode);

    if (charStr === 'W' || charCode === 38) {
      this.game.ship.power([0, -1]);
    } else if (charStr === 'A' || charCode === 37) {
      this.game.ship.power([-1, 0]);
    } else if (charStr === 'S' || charCode === 40) {
      this.game.ship.power([0, 1]);
    } else if (charStr === 'D' || charCode === 39) {
      this.game.ship.power([1, 0]);
    }
  };
};

module.exports = GameView;