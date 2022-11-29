/* global Phaser */

class Actor extends Phaser.Physics.Arcade.Sprite{
constructor(newScene, x,y, sprite) {
  super(newScene, x,y, sprite);

  this.scene = newScene;
  this.dead = false;

  this.health = 100;
  this.lifeBar;

  this.attackRange = 30;

  this.attackHitbox = new Phaser.Physics.Arcade.Image(this.scene,
  this.x + this.width/2, this.y + this.height/2, 'arbolV', 4);

  this.attackHitbox.attackDmg =20;

  this.attackCooldown = 1;
  this.timeSinceLastIncrement = -1;
  this.bullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true });

  this.inventory = new Inventory();

  this.direction = 'down';
  this.speed = 100;

  this.spriteName = {idle: 'idleStand', down: 'downAnim',}

  this.initSounds();



}

distAttack(targets) {
 this.actualTime = this.scene.time.now / 1000;

   if (this.actualTime > (this.timeSinceLastIncrement + this.attackCooldown)) {
     // Get bullet from bullets group
     var bullet = this.bullets.get().setActive(true).setVisible(true);
     if (bullet) {
       bullet.fire(this, targets);
       this.scene.physics.add.collider(targets, bullet, function (target, bull) {
         target.health -= 10;
         console.log("Enemigo dañado por bala");
         console.log("Vida restante = " + target.health);

         // Kill enemy if health = 0
         if (target.health == 0) {
           target.anims.play('malvinDie');
           target.dead = true;
           target.destroy();
         }

         // Destroy bullet
         bull.setActive(false).setVisible(false);
       });

       this.timeSinceLastIncrement = this.scene.time.now / 1000;

     }
   }

}

  getHurt(damage){
    this.attackerDmg = damage;
    this.stateMachine.transition('getHurt');
}
  initSounds() {
      this.hitSound = this.scene.sound.add('hitSound', { loop: false });
    }

}


class P1 extends Actor {
  constructor(newScene, x,y) {
    super(newScene, x,y, 'icy');

    this.stateMachine = new StateMachine('idle', {
      idle: new IdleState(),
      move: new MoveState(),
      attack: new AttackState(),
      getHurt: new PlayerGetHurtState(),
    }, [this.scene, this]);

    this.spriteName = {idle: 'idle', down: 'down', up: 'up',left:'left',
  right: 'right', death: 'death', punch: 'punch'} ;


    this.keys;
    this.initInput();
    this.initAnimations();
    this.inventory.init(this.scene);
  }

  initAnimations() {
    this.scene.anims.create({
      key: 'down',
      frames: this.scene.anims.generateFrameNumbers('icy', { start: 7, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

     this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('icy', {start: 0, end:4 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key:'up',
      frames: this.scene.anims.generateFrameNumbers('icy', {start:14, end:19}),
      frameRate:10,
      repeat:-1
    });

    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('icy',{start:28,end:32}),
      frameRate:15,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('icy',{start:21,end:25}),
      frameRate: 15,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'death',
      frames: this.scene.anims.generateFrameNumbers('icyattack', {start:36,end:44}),
      frameRate:10
    });

    this.scene.anims.create({
        key: 'punch-down',
        frames: this.scene.anims.generateFrameNumbers('icyattack', { start:0,end:5 }),
        frameRate: 20,
      });
    this.scene.anims.create({
          key: 'punch-up',
          frames: this.scene.anims.generateFrameNumbers('icyattack', { start:9,end:14 }),
          frameRate: 20,
      });
    this.scene.anims.create({
          key: 'punch-left',
          frames: this.scene.anims.generateFrameNumbers('icyattack', { start:27,end:31 }),
          frameRate: 20,
      });
    this.scene.anims.create({
          key: 'punch-right',
          frames: this.scene.anims.generateFrameNumbers('icyattack', { start:18,end:22 }),
          frameRate: 20,
        });

  }

  initInput() {

    this.keys = this.scene.input.keyboard.addKeys({
     'up': Phaser.Input.Keyboard.KeyCodes.W,
     'down': Phaser.Input.Keyboard.KeyCodes.S,
     'left': Phaser.Input.Keyboard.KeyCodes.A,
     'right': Phaser.Input.Keyboard.KeyCodes.D,
     'inventory': Phaser.Input.Keyboard.KeyCodes.Q,
     'sword': Phaser.Input.Keyboard.KeyCodes.ONE,
     'wand': Phaser.Input.Keyboard.KeyCodes.TWO,
     'attack': Phaser.Input.Keyboard.KeyCodes.C
   });

 }

  move() {

    if(!this.dead){
      this.stateMachine.step();
      this.inventory.open(this.keys,this);
    /*  if(this.scene.input.activePointer.isDown){
      if(this.scene.input.activePointer.rightButtonDown()){
            this.distAttack();
      } else {
        this.attack();
      }

    }*/
    }
  }
}

class P2 extends Actor {
    constructor(newScene, x,y) {
      super(newScene, x,y, 'icyB');

      this.stateMachine = new StateMachine('idle', {
        idle: new IdleState(),
        move: new MoveState(),
        attack: new AttackState(),
        getHurt: new PlayerGetHurtState(),
      }, [this.scene, this]);

      this.spriteName = {idle: 'idleB', down: 'downB', up: 'upB',left:'leftB',
    right: 'rightB', death: 'deathB'} ;

      this.keys;
      this.pad;
      this.buttons;
      this.control = false;
      this.initAnimations();
      this.initInput();
      this.inventory.init2(this.scene);
    }

    initAnimations(){
      this.scene.anims.create({
        key: 'downB',
        frames: this.scene.anims.generateFrameNumbers('icyB', { start: 7, end: 12 }),
        frameRate: 10,
        repeat: -1
      });

       this.scene.anims.create({
        key: 'idleB',
        frames: this.scene.anims.generateFrameNumbers('icyB', {start: 0, end:4 }),
        frameRate: 10,
        repeat: -1
      });

      this.scene.anims.create({
        key:'upB',
        frames: this.scene.anims.generateFrameNumbers('icyB', {start:14, end:19}),
        frameRate:10,
        repeat:-1
      });

      this.scene.anims.create({
        key: 'leftB',
        frames: this.scene.anims.generateFrameNumbers('icyB',{start:28,end:32}),
        frameRate:15,
        repeat: -1
      });

      this.scene.anims.create({
        key: 'rightB',
        frames: this.scene.anims.generateFrameNumbers('icyB',{start:21,end:25}),
        frameRate: 15,
        repeat: -1
      });

      this.scene.anims.create({
        key: 'deathB',
        frames: this.scene.anims.generateFrameNumbers('yciattack', {start:36,end:44}),
        frameRate:10
      });

        this.scene.anims.create({
            key: 'punchB-down',
            frames: this.scene.anims.generateFrameNumbers('yciattack', { start:0,end:5 }),
            frameRate: 20,
          });
        this.scene.anims.create({
              key: 'punchB-up',
              frames: this.scene.anims.generateFrameNumbers('yciattack', { start:9,end:14 }),
              frameRate: 20,
          });
        this.scene.anims.create({
              key: 'punchB-left',
              frames: this.scene.anims.generateFrameNumbers('yciattack', { start:27,end:31 }),
              frameRate: 20,
          });
        this.scene.anims.create({
              key: 'punchB-right',
              frames: this.scene.anims.generateFrameNumbers('yciattack', { start:18,end:22 }),
              frameRate: 20,
            });

          this.scene.anims.create({
          key: 'getHurt',
          frames: this.scene.anims.generateFrameNumbers('icydmg', { start:0,end:1 }),
          frameRate: 10,
        })
    }

    initInput() {
      this.keys = this.scene.input.keyboard.addKeys({
       'up': Phaser.Input.Keyboard.KeyCodes.UP,
       'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
       'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
       'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
       'inventory': Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO,
       'sword': Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE,
       'wand': Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
       'attack': Phaser.Input.Keyboard.KeyCodes.J
     });
    }

    checkGamepad() {
      if(this.scene.input.gamepad.total === 1){
      this.control = true;
      }
  }

    move() {
      this.pad = this.scene.input.gamepad.getPad(0);
      if(this.control && !this.dead) {
          if (this.pad.axes.length)
         {

           var axisH = this.pad.axes[0].getValue();
           var axisV = this.pad.axes[1].getValue();

           this.setVelocityX(this.speed * axisH);
           this.setVelocityY(this.speed * axisV);

           if(axisH < 0) {

           if(!(this.anims.getCurrentKey() === 'upB' || this.anims.getCurrentKey() === 'downB'))
           this.anims.play('leftB',true);
          } else if(axisH > 0) {

             if(!(this.anims.getCurrentKey() === 'up' || this.anims.getCurrentKey() === 'downB'))
             this.anims.play('rightB',true);
           }

           else if(axisV<0) {
            this.anims.play('upB',true);
           } else if (axisV >0){
            this.anims.play('downB',true);
          }

          if(this.pad.isButtonDown(2)){
            this.attack();
          }

          if(this.pad.isButtonDown(3)){
            this.distAttack();
          }

          if(this.body.velocity.equals(new Phaser.Math.Vector2(0, 0)) && this.health >0 && !(this.anims.getCurrentKey() === 'punch')){
            this.anims.play('idleB',true);
          } else if(this.health <= 0 && !this.dead){
          this.anims.play('death',true);
          this.dead = true;
          }

       }
     } else if(!this.dead) {
             this.stateMachine.step();
             this.inventory.open(this.keys,this);
     }
    }
}
