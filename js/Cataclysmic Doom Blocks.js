window.onload = function() {

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

//Global Variables
var ajax;
var Block;
var Bomb;
var DBlock;
var Explosion;
var Laser;
var MedKit;
var Missile;
var Shield;
var score = 0;
var scoreText;
var lives = 1;
var livesText;
var weapon;
var Back1;
var Back2;
var Blocks;
var powerup;
var difficulty = 1;
var gameState = 1; //1 = playing, 0 = dead

function preload() {
  game.load.image('background', 'assets/Background.png');
  game.load.image('ajax', 'assets/Ajax.png');
  game.load.image('ajaxN', 'assets/AjaxN.png')
  game.load.image('Block', 'assets/Block.png');
  game.load.image('bomb', 'assets/Bomb.png');
  game.load.image('dblock', 'assets/DBlock.png');
  game.load.image('explosion', 'assets/Explosion.png');
  game.load.image('laser', 'assets/Laser.png');
  game.load.image('medKit', 'assets/Med Kit.png');
  game.load.image('missile', 'assets/Missile.png');
  game.load.image('shield', 'assets/Shield.png');
  game.load.image('gameover', 'assets/Gameover.png');
  game.load.image('Restart', 'assets/Restart.png');

}
function create() {
  //Adding Background
  Back1 = game.add.sprite(0,0,'background');
  Back2 = game.add.sprite(game.world.width,0,'background');

  //Creating the player
  ajax = game.add.sprite(64, 64, 'ajax');
  game.physics.arcade.enable(ajax);
  ajax.body.collideWorldBounds = true;

  //Creating the blocks on the level
  Blocks = game.add.group();
  DBlocks = game.add.group();
  powerup = game.add.group();
  Blocks.enableBody = true;
  DBlocks.enableBody = true;
  powerup.enableBody = true;

  //Use a loop to create all of the normal blocks
  for (var i=0; i < 2; i++) {
    spawnBlock();
  }
  //Use a loop to create all of the Destructible blocks
  for (var i=0; i < 6; i++) {
    spawnBlock2();
  }

  for (var b=0; b < 1; b++) {
    spawnPowerup();
  }

  //Text
  livesText = game.add.text(600,game.world.height-50,'Lives: ' + lives, {fill: 'red'});
  scoreText = game.add.text(600,game.world.height-75,'Score: ' + score, {fill: 'orange'});

  //Weapon Setup
  weapon = game.add.weapon(10,'laser');
  weapon.enableBody = true;
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  weapon.bulletSpeed = 300;
  weapon.fireRate = 350;
  weapon.trackSprite(ajax);
  weapon.trackOffset.x = 60;
  weapon.trackOffset.y = 24;
  weapon.fireAngle = Phaser.ANGLE_RIGHT;

  //Creating controls
  moveKeys = game.input.keyboard.addKeys(
  {
    'up': Phaser.KeyCode.W,
    'up2':Phaser.KeyCode.UPARROW,
    'shoot':Phaser.KeyCode.SPACEBAR,
    'restart':Phaser.KeyCode.R
  })

}

function update() {
if(gameState == 1){
// Moves the x value of Back1 and Back2 backwards every frame
  Back1.x --;
  Back2.x --;
  score++;
  scoreText.text = "Score: " + score;
  //INcreasing the score every 1500 frames
  if(score % 1500 == 0) {
    difficulty++;
  }

//Removal of the normal blocks
Blocks.forEach(function(block) {
  block.x--;
    if (block.x < 0) {
        Blocks.remove(block);
        spawnBlock();
    }
  }
);

//Removal of the Destructible blocks

DBlocks.forEach(function(dblock) {
  dblock.x--;
    if (dblock.x < 0) {
        DBlocks.remove(dblock);
        spawnBlock2();
    }
  }
);

powerup.forEach(function(scrolling) {
  scrolling.x--;
  if (scrolling.x < 0) {
      powerup.remove(scrolling);
      spawnPowerup();
  }
}
);

// Setting up Collisions
game.physics.arcade.collide(weapon.bullets, DBlocks, destroyDBlock );
game.physics.arcade.collide(DBlocks, ajax, killPlayer);
game.physics.arcade.collide(Blocks, ajax, killPlayer);
game.physics.arcade.collide(powerup, ajax, doMedKit);


//Scrolling background
  if (Back1.x < -game.world.width) {
    Back1.x = game.world.width;
  }

  if (Back2.x < -game.world.width) {
    Back2.x = game.world.width;
  }

//Controls
  if (moveKeys.up.isDown || moveKeys.up2.isDown) {
    ajax.y -= 7;
} else {
  ajax.y += 5;
}

//Shooting
  if (moveKeys.shoot.isDown) {
    weapon.fire();
  }
}

//Calling the restart button function
if (gameState == 0 && moveKeys.restart.isDown) {
  location.reload();
}

//End of update
}
//The spawn block function
function spawnBlock(){
  for(i=0;i<difficulty;i++){
  var myX = game.rnd.integerInRange(game.world.width/2,game.world.width);
  var myY = game.rnd.integerInRange(0,game.world.height);
  var block = Blocks.create(myX, myY, 'Block');
  var stopChance = game.rnd.integerInRange(0,3);
  if(stopChance > 0){
    return;
  }
  }
}

function spawnBlock2(){
  for(i=0;i<difficulty;i++){
  var myX2 = game.rnd.integerInRange(game.world.width/2,game.world.width);
  var myY2 = game.rnd.integerInRange(0,game.world.height);
  var dblock = DBlocks.create(myX2, myY2, 'dblock');
  var stopChance = game.rnd.integerInRange(0,3);
  if(stopChance > 0){
    return;
  }
  }
}

function destroyDBlock(laser, dblock) {

  laser.kill();
  dblock.kill();
  DBlocks.remove(dblock);
  spawnBlock2();
}

  function killPlayer(ajax, Block) {
    lives--;
    Block.kill();
    Blocks.remove(Block);
    DBlocks.remove(Block);
    livesText.text = "Lives: " + lives;
    if(lives <= 0){
    ajax.kill();
    gameState = 0;
    game.add.sprite(100, 150, 'gameover');
    game.add.sprite(235, 450, 'Restart');
    if (moveKeys.restart.isDown) {

    }
}
}

  function spawnPowerup () {
    var myX = game.rnd.integerInRange(game.world.width/2,game.world.width);
    var myY = game.rnd.integerInRange(0,game.world.height);
    var value = game.rnd.integerInRange(1, 3);
    //switch (value){
    //  case 1:
      pup = powerup.create(myX, myY,'medKit');
    //  break ;
    //  case 2:
    //  pup = powerup.create(myX, myY,'shield');
    //  break ;
    //  case 3:
  //    pup = powerup.create(myX, myY,'bomb');
  //    break ;
  }

  function doMedKit(ajax, pup){
    console.log('here');
    lives++;
    livesText.text = "Lives: " + lives;
    pup.kill();
    powerup.remove(pup);
    spawnPowerup();
  }

}
