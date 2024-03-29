function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.cleanup = false;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function (delta) {
  this.pos = [this.pos[0] + this.vel[0] * delta, this.pos[1] + this.vel[1] * delta];
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const [x, y] = this.pos;
  const [otherX, otherY] = otherObject.pos;
  const radSum = this.radius + otherObject.radius;

  return Math.abs(x - otherX) < radSum && Math.abs(y - otherY) < radSum;
};

MovingObject.prototype.collidedWith = function (otherObject) {
  
};

module.exports = MovingObject;
