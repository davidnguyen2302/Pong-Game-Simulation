function Background(game) {
	this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/background_600x800.png"), 0, 0, 600, 800, 1, 1, true, false);
    Entity.call(this, game, 0, 0);
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
	
};

Background.prototype.draw = function (ctx) {
    //ctx.fillStyle = "SaddleBrown";
    //ctx.fillRect(0,500,800,300);
	this.bgAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};
