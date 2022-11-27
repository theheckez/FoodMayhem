/* global Phaser */

class Actor extends Phaser.Physics.Arcade.Sprite{
constructor(newScene, x,y, sprite) {
  super(newScene, x,y, sprite);

  this.scene = newScene;
  this.dead = false;

  this.health = 100;
  this.lifeBar;

  this.attackDmg = 20;
  this.attackRange = 50;

  this.attackHitbox = new Phaser.Physics.Arcade.Image(this.scene,this.x,this.y,'icyattack',4);
  //this.attackHitbox.body = new Phaser.Physics.Arcade.Body(this.scene,this);
  this.scene.physics.arcade.enable(this.attackHitbox);
  console.log(this.attackHitbox.body);
//  console.log(this.attackHitbox.body.enable);
  this.direction = 'down';

  this.stateMachine = new StateMachine('idle', {
    idle: new IdleState(),
    move: new MoveState(),
    swing: new SwingState(),
    dash: new DashState(),
  }, [this.scene, this]);


  this.attackCooldown = 1;
  this.bullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true });

  this.speed = 100;

 this.initSounds();
}

attack () {
  this.actualTime = this.scene.time.now / 1000;

  if (this.actualTime > (this.timeSinceLastIncrement + this.attackCooldown)) {

    //this.anims.play('punch', true);

    this.setVelocityX(0);
    this.setVelocityY(0);
    this.attackHitbox.x = this.x;
    this.attackHitbox.y = this.y + 20;

    this.scene.physics.add.existing(this.attackHitbox);

    this.hitSound.play();

    console.log("Enemigo dañado");

  this.timeSinceLastIncrement = this.scene.time.now / 1000;

  }
    this.attackHitbox.body.enable = false;
    this.scene.physics.world.remove(this.attackHitbox.body);
  this.on('animationcomplete', function() {
    console.log("animación completada");
  //this.knightStateMachine.setState('idle')

  //  this.attackHitbox.body.enable = false;
    //this.scene.physics.world.remove(this.attackHitbox.body);
});

}

distAttack(targets) {
 this.actualTime = this.scene.time.now / 1000;

   console.log("Right pointer Down")
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

  initSounds() {
   this.hitSound = this.scene.sound.add('hitSound', { loop: false });
    }

}


class P1 extends Actor {
  constructor(newScene, x,y) {
    super(newScene, x,y, 'icy');

    this.keys;
    this.initInput();
    this.initAnimations();
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
        key: 'punch',
        frames: this.scene.anims.generateFrameNumbers('icyattack', { frames: [0, 1, 2, 3, 4, 5] }),
        frameRate: 20,
      });

  }

  initInput() {

    this.keys = this.scene.input.keyboard.addKeys({
     'up': Phaser.Input.Keyboard.KeyCodes.W,
     'down': Phaser.Input.Keyboard.KeyCodes.S,
     'left': Phaser.Input.Keyboard.KeyCodes.A,
     'right': Phaser.Input.Keyboard.KeyCodes.D
   });

 }

  move() {

    if(!this.dead){
      this.stateMachine.step();

      if(this.scene.input.activePointer.isDown){
      if(this.scene.input.activePointer.rightButtonDown()){
            this.distAttack();
      } else {
        this.attack();
      }

      }

      if(this.health === 0 && !this.dead){
      this.anims.play('death',true);
      this.dead = true;
      }
    }
  }
}

class P2 extends Actor {
    constructor(newScene, x,y) {
      super(newScene, x,y, 'icyB');

      this.pad;
      this.buttons;
      this.control = false;
      this.initAnimations();
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
        key: 'death',
        frames: this.scene.anims.generateFrameNumbers('icyattack', {start:36,end:44}),
        frameRate:10
      });

      this.scene.anims.create({
          key: 'punch',
          frames: this.scene.anims.generateFrameNumbers('icyattack', { frames: [0, 1, 2, 3, 4, 5] }),
          frameRate: 10,
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
          } else if(this.health === 0 && !this.dead){
          this.anims.play('death',true);
          this.dead = true;
          }

       }
        }
    }
}
