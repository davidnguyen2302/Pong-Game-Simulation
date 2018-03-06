var friction = 1;
var acceleration = 1000000;
var maxSpeed = 1000;

function Ball(game, id) {
	this.GOAnimation1 = new Animation(ASSET_MANAGER.getAsset("./img/game-over1.png"), 0, 0, 600, 800, 1, 1, true, false);
	this.GOAnimation2 = new Animation(ASSET_MANAGER.getAsset("./img/game-over2.png"), 0, 0, 600, 800, 1, 1, true, false);
	this.x = getRandomInt(600);
	this.y = 400;
	this.crossed = false;
	this.id = id;
    this.radius = 10;
	var randomize = Math.random() < 0.5 ? -1 : 1;
	this.velocity = { x: Math.random() * 1000 * randomize, y: Math.random() * 1000 * randomize};
    var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    if (speed > maxSpeed) {
        var ratio = maxSpeed / speed;
        this.velocity.x *= ratio;
        this.velocity.y *= ratio;
    }
	this.boundingBox = new BoundingBox(this.x - this.radius,this.y - this.radius, 2 * this.radius, 2 * this.radius);
	Entity.call(this, game, this.x, this.y);
};

Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;

Ball.prototype.collideLeft = function () {
    return (this.x - this.radius) < 0;
};

Ball.prototype.collideRight = function () {
    return (this.x + this.radius) > width;
};

Ball.prototype.collideTop = function () {
    return (this.y - this.radius) < 0;
};

Ball.prototype.collideBottom = function () {
    return (this.y + this.radius) > height;
};

Ball.prototype.update = function () {
	var topPad = this.game.entities[2];
	var botPad = this.game.entities[3];
	this.x += this.velocity.x * this.game.clockTick;
    this.y += this.velocity.y * this.game.clockTick;
	if (this.collideLeft() || this.collideRight()) {
        this.velocity.x = -this.velocity.x * friction;
        if (this.collideLeft()) this.x = this.radius;
        if (this.collideRight()) this.x = width - this.radius;
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
    }
	
    if (this.collideTop() || this.collideBottom()) {
        this.velocity.y = -this.velocity.y * friction;
        if (this.collideTop()) {
			this.y = this.radius;
			console.log("COLLIDED WITH TOP");
			if (this.boundingBox.hasCollided(topPad.boundingBox)) {
				console.log("BOUNCED OFF PAD: ", topPad.id);
			} else {
				this.x = getRandomInt(600);
				this.y = 400;
				console.log("HIT TOP *****************************");
				console.log("Ball's left =", this.x - this.radius);
				console.log("Ball's right =", this.x + this.radius);
				console.log("Ball's top =", this.y - this.radius);
				console.log("Ball's bot =", this.y + this.radius);
				console.log("PAD  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", topPad.id);
				console.log("Pad's left =", topPad.x);
				console.log("Pad's right =", topPad.x + topPad.width);
				console.log("Pad's top =", topPad.y);
				console.log("Pad's bot =", topPad.y + topPad.height);
				botPad.score++;
			}
		}
        if (this.collideBottom()) {
			this.y = height - this.radius;
			console.log("COLLIDED WITH BOT");
			if (this.boundingBox.hasCollided(botPad.boundingBox)) {
				console.log("BOUNCED OFF PAD: ", botPad.id);
			} else {
				this.x = getRandomInt(600);
				this.y = 400;
				console.log("HIT BOT *****************************");
				console.log("Ball's left =", this.x - this.radius);
				console.log("Ball's right =", this.x + this.radius);
				console.log("Ball's top =", this.y - this.radius);
				console.log("Ball's bot =", this.y + this.radius);
				console.log("PAD  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", botPad.id);
				console.log("Pad's left =", botPad.x);
				console.log("Pad's right =", botPad.x + botPad.width);
				console.log("Pad's top =", botPad.y);
				console.log("Pad's bot =", botPad.y + botPad.height);
				topPad.score++;
			}
		}
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
	}
    this.velocity.x -= (1 - friction) * this.game.clockTick * this.velocity.x;
    this.velocity.y -= (1 - friction) * this.game.clockTick * this.velocity.y;
	console.log("VELOCITY X: ", this.velocity.x);
	console.log("VELOCITY Y: ", this.velocity.y);
	if (topPad.score >= winScore || botPad.score >= winScore) {
		gameover = true;
		if (topPad.score >= winScore && !p2) { 
			p1 = true;
		} else if (botPad.score >= winScore && !p1) {
			p2 = true;
		}
	}	
	this.boundingBox = new BoundingBox(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
	Entity.prototype.update.call(this);
};

Ball.prototype.draw = function (ctx) {
	if (gameover) {
		if (p1) {
			this.GOAnimation1.drawFrame(this.game.clockTick, ctx, 0, 0);
		} else if (p2) {
			this.GOAnimation2.drawFrame(this.game.clockTick, ctx, 0, 0);
		}
	} else {
		ctx.beginPath();
		ctx.fillStyle = "red"
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();
	}
	Entity.prototype.draw.call(this);
};