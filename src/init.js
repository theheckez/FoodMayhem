//Yo meteria aqui todo lo necesario para incializar el juego y tal (en plan configuracion, create, preload...)
const config = {
    type: Phaser.Auto,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 0},
        debug: true
      }
    },
    scene: [ MainGame ]
};

var game = new Phaser.Game(config);

var Player = new Phaser.Class({
    Extends: Phaser.Physics.Arcade.Sprite,
    initialize:

    function Player(scene) {
      Phaser.Physics.Arcade.Sprite.call(this, scene, 500,450, 'dude', 2);

      this.health = 100;
      this.attack;
    }


  });

  var Enemy = new Phaser.Class({
    initialize:

    function Enemy(enemy) {
      this.parent = enemy;
      this.health = 100;
    },

    hunt: function(target) {
      parent.rotation = Phaser.Math.Angle.Between(parent.x, parent.y, target.x, target.y);

    }
  });
  
var MainGame = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function MainGame() {
       Phaser.Scene.call(this, { key: 'mainGame' });

       this.keys;

    },

    preload: function(){
      this.load.image('sky', 'assets/sky.png');
      this.load.spritesheet('dude', 'assets/IcyFrontAnimation1.png', { frameWidth: 64, frameHeight: 64 });
      //this.load.image('pumpkin', 'assets/pumpkin_dude.png');
    },

    create: function() {
      this.add.image(400,300,'sky');

      player = this.physics.add.existing(new Player(this));
      this.add.existing(player);

      keys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
      });

      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 2 } ],
        frameRate: 20
      });

    },

    update: function() {

      this.checkInput();
      
    },

    

    checkInput: function() {
      if(keys['up'].isDown) 
      {
        player.setVelocityY(-160);
      } 
      else if (keys['down'].isDown)
      {
        player.setVelocityY(160);
        player.anims.play('down', true);

      } 
      else 
      {
        player.setVelocityY(0);
        player.anims.play('turn');
      }

      if(keys['left'].isDown) 
      {
        player.setVelocityX(-160);

      } 
      else if(keys['right'].isDown) 
      {
        player.setVelocityX(160);
      } 
      else 
      {
        player.setVelocityX(0);

      }
    },

  });
  