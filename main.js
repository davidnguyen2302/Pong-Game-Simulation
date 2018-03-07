
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};
// the "main" code begins here

var ASSET_MANAGER = new AssetManager();
var gameover = false;
var p1 = false;
var p2 = false;
var winScore = 5;

ASSET_MANAGER.queueDownload("./img/background_600x800.png");
ASSET_MANAGER.queueDownload("./img/game-over1.png");
ASSET_MANAGER.queueDownload("./img/game-over2.png");

ASSET_MANAGER.downloadAll(function () {
	console.log("starting up da sheild");
	var canvas = document.getElementById('gameWorld');

	var saveButton = document.getElementById("save");
	var loadButton = document.getElementById("load");
	var restartButton = document.getElementById("restart");
	var scoreSlider = document.getElementById("slider");
	var maxScore = document.getElementById("maxScore");
	
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

	gameEngine.init(ctx, saveButton,loadButton);
	gameEngine.start();
	
	saveButton.addEventListener("click", function(e){
		var coordinates = [];
		for (var i = 1; i < gameEngine.entities.length; i++) {
			var ent = gameEngine.entities[i];
			coordinates.push(ent.x);
			coordinates.push(ent.y);
		}
		coordinates.push(gameEngine.entities[1].velocity.x);
		coordinates.push(gameEngine.entities[1].velocity.y);
		coordinates.push(gameEngine.entities[2].score);
		coordinates.push(gameEngine.entities[3].score);
		coordinates.push(gameover);
		coordinates.push(p1);
		coordinates.push(p2);
		coordinates.push(winScore);
		gameEngine.saveState(coordinates);
	}, false);
	
	restartButton.addEventListener("click", function(e){
		gameEngine.entities[1].x = width/2;
		gameEngine.entities[1].y = height/2;
		var randomize = Math.random() < 0.5 ? -1 : 1;
		gameEngine.entities[1].velocity = { x: Math.random() * 1000 * randomize, y: Math.random() * 1000 * randomize};
		gameEngine.entities[2].score = 0;
		gameEngine.entities[3].score = 0;
		gameover = false;
		p1 = false;
		p2 = false;
		console.log("Game restarted");
	}, false);
	
	scoreSlider.addEventListener("change", function(e){
		winScore = scoreSlider.value;
	}, false);
	
	gameEngine.socket.on("load", function (e) {
		for (var i = 1, j = 0; i < gameEngine.entities.length; i++) {
			var ent = gameEngine.entities[i];
				ent.x = e.state[j++];
				ent.y = e.state[j++];
		}
		var k = 6;
		gameEngine.entities[1].velocity.x = e.state[k++];
		gameEngine.entities[1].velocity.y = e.state[k++];
		gameEngine.entities[2].score = e.state[k++];
		gameEngine.entities[3].score = e.state[k++];
		gameover = e.state[k++];
		p1 = e.state[k++];
		p2 = e.state[k++];
		winScore = e.state[k];
		scoreSlider.value = winScore;
		maxScore.value = "MAX SCORE: " + winScore;
		console.log("Loaded state", e.state);
	});

});



