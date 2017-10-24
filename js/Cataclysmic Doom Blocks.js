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
var playerbullet;

function preload() {
  game.load.image('background', 'assets/Background.png');
  game.load.image('ajax', 'assets/Ajax.png');
  game.load.image('ajaxN', 'assets/AjaxN.png')
  game.load.image('block', 'assets/Block.png');
  game.load.image('bomb', 'assets/Bomb.png');
  game.load.image('DBlock', 'assets/DBlock.png');
  game.load.image('explosion', 'assets/Explosion.png');
  game.load.image('playerbullet', 'assets/Laser.png');
  game.load.image('medKit', 'assets/Med Kit.png');
  game.load.image('missile', 'assets/Missile.png');
  game.load.image('shield', 'assets/Shield.png');
 }

function create() {
  //Adding Background
  background = game.add.sprite(0,0,'background');

  //Creating the player
  ajax = game.add.sprite(64, 64, 'ajax');
  game.physics.arcade.enable(ajax);
  ajax.body.collideWorldBounds = true;

  //Text
  livesText = game.add.text(650,game.world.height-50,'Lives: ' + lives, {fill: 'red'});
  scoreText = game.add.text(650,game.world.height-75,'Score: ' + score, {fill: 'orange'});

  //Weapon Setup
  playerbullet = game.add.group();
  playerbullet.enableBody = true;
  playerbullet.scale.setTo(1,1);

  //Creating controls
  moveKeys = game.input.keyboard.addKeys(
  {
    'up': Phaser.KeyCode.W,
    'up2':Phaser.KeyCode.UPARROW
  })
}

function update() {
  if (moveKeys.up.isDown || moveKeys.up2.isDown) {
    ajax.y -= 7;
} else {
  ajax.y += 5;
}


}
};
