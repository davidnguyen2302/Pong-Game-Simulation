function Pad(game, x, y, id, Ball) {
	this.target = Ball;
	this.id = id;
	this.score = 0;
	
	this.x = x;
	this.y = y;
	this.speed = 25;
	this.width = 60;
	this.height = 10;
	this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
	
	Entity.call(this, game, this.x, this.y);
};

Pad.prototype = new Entity();
Pad.prototype.constructor = Pad;

Pad.prototype.update = function () {
	if (this.id === 1) {
		if (this.target.y <= 120 && this.x !== this.target.x) {
			if (this.target.x > this.x + this.width) {
				this.x += 1 * this.speed;
			} else if (this.target.x < this.x) {
				this.x -= 1 * this.speed;
			} else {
				this.x += 0;
			}
		}
	} else if (this.id === 2) {
		if (this.target.y >= 680 && this.x !== this.target.x) {
			if (this.target.x > this.x + this.width) {
				this.x += 1 * this.speed;
			} else if (this.target.x < this.x) {
				this.x -= 1 * this.speed;
			} else {
				this.x += 0;
			}
		}
	}
	//this.x = this.target.x - this.target.radius;
	
	//this.x += (this.target.x - this.target.radius) * this.speed;
	if (this.x < 0) this.x = 0;
	if (this.x + this.width > 600) this.x = 600 - this.width;
	this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
	Entity.prototype.update.call(this);
};

Pad.prototype.draw = function (ctx) {
	if (!gameover) {
		ctx.beginPath();
		ctx.fillStyle = "white"
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.closePath();
		
		ctx.font = "60px Arial";
		ctx.fillStyle = "white";
		if (this.id === 1) {
			ctx.fillText(this.score, width/2 - 20, height/2 - 60);
		} else if (this.id === 2) {
			ctx.fillText(this.score, width/2 - 20, height/2 + 100);
		}
		this.boundingBox.draw(ctx);
	}
	Entity.prototype.draw.call(this);
};