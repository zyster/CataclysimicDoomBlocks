window.onload = function() {

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

//Global Variables
var Ajax;
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
  game.load.image('Ajax', 'assets/Ajax.png');
  game.load.image('Block', 'assets/Block.png');
  game.load.image('Bomb', 'asstes/Bomb.png');
  game.load.image('DBlock', 'assets/DBlock.png');
  game.load.image('Explosion', 'assets/Explosion.png');
  game.load.image('Laser', 'assets/Laser.png');
  game.load.image('MedKit', 'assets/MedKit.png');
  game.load.image('Missile', 'assets/Missile.png');
  game.load.image('Shield', 'assets/Shield.png');
 }

function create() {
//Text
livesText = game.add.text(20,game.world.height-100,'Lives: ' + lives, {fill: 'red'});
scoreText = game.add.text(20,game.world.height-125,'Score: ' + score, {fill: 'orange'});
//Weapon Setup
weapon = game.add.weapon(100, 'Laser');
weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BONUS;
weapon.bulletSpeed = 1500;
weapon.fireRate = 1500;
weapon.bulletRotateToVelocity = true;
weapon.trackSprite(Ajax);
}

function update() {
  
}
};
