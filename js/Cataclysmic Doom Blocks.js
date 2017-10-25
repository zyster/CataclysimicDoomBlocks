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

function preload() {
  game.load.image('background', 'assets/Background.png');
  game.load.image('ajax', 'assets/Ajax.png');
  game.load.image('ajaxN', 'assets/AjaxN.png')
  game.load.image('block', 'assets/Block.png');
  game.load.image('bomb', 'assets/Bomb.png');
  game.load.image('DBlock', 'assets/DBlock.png');
  game.load.image('explosion', 'assets/Explosion.png');
  game.load.image('laser', 'assets/Laser.png');
  game.load.image('medKit', 'assets/Med Kit.png');
  game.load.image('missile', 'assets/Missile.png');
  game.load.image('shield', 'assets/Shield.png');
 }

function create() {
  //Adding Background
  Back1 = game.add.sprite(0,0,'background');
  Back2 = game.add.sprite(game.world.width,0,'background');

  //Creating the player
  ajax = game.add.sprite(64, 64, 'ajax');
  game.physics.arcade.enable(ajax);
  ajax.body.collideWorldBounds = true;

  //Text
  livesText = game.add.text(650,game.world.height-50,'Lives: ' + lives, {fill: 'red'});
  scoreText = game.add.text(650,game.world.height-75,'Score: ' + score, {fill: 'orange'});

  //Weapon Setup
  weapon = game.add.weapon(5,'laser');
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  weapon.bulletSpeed = 300;
  weapon.fireRate = 100;
  weapon.trackSprite(ajax);
  weapon.trackOffset.x = 60;
  weapon.trackOffset.y = 24;
  weapon.fireAngle = Phaser.ANGLE_RIGHT;

  //Creating controls
  moveKeys = game.input.keyboard.addKeys(
  {
    'up': Phaser.KeyCode.W,
    'up2':Phaser.KeyCode.UPARROW,
    'shoot':Phaser.KeyCode.SPACEBAR
  })
}

function update() {
// Moves the x value of Back1 and Back2 backwards every frame
  Back1.x --;
  Back2.x --;

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
};
