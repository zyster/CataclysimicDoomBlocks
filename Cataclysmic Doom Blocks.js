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

function preload() {
  game.load.image('ajax', 'assets/Ajax.png');
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
  //Creating the player
  ajax = game.add.sprite(64, 64, 'ajax');
  //Text
  livesText = game.add.text(650,game.world.height-50,'Lives: ' + lives, {fill: 'red'});
  scoreText = game.add.text(650,game.world.height-75,'Score: ' + score, {fill: 'orange'});
  //Weapon Setup
  //weapon = game.add.weapon(100, 'Laser');
  //weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BONUS;
  //weapon.bulletSpeed = 1500;
  //weapon.fireRate = 1500;
  //weapon.bulletRotateToVelocity = true;
  //weapon.trackSprite(Ajax);
}

function update() {

}
};
