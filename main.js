
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};
// the "main" code begins here

var ASSET_MANAGER = new AssetManager();
var gameover = false;
var p1 = false;
var p2 = false;
var winScore = 3;

ASSET_MANAGER.queueDownload("./img/background_600x800.png");
ASSET_MANAGER.queueDownload("./img/game-over1.png");
ASSET_MANAGER.queueDownload("./img/game-over2.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
	
    var gameEngine = new GameEngine();
    var ball = new Ball(gameEngine, 0);
	var bg = new Background(gameEngine);
	var topPad = new Pad(gameEngine, 0, 0, 1, ball);
	var botPad = new Pad(gameEngine, 0, 790, 2, ball);
	
	gameEngine.addEntity(bg);
    gameEngine.addEntity(ball);
	gameEngine.addEntity(topPad);
	gameEngine.addEntity(botPad);
	
    gameEngine.init(ctx);
    gameEngine.start();
});
