/* global Phaser */

class Actor extends Phaser.Physics.Arcade.Sprite{
constructor(newScene, x,y, sprite) {
  super(newScene, x,y, sprite);

  this.scene = newScene;
  this.dead = false;
  this.control = false;

  this.health = 100;
  this.lifeBar;


  this.attackRange = 35;
  this.bullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true });
  this.attackHitbox = new Phaser.Physics.Arcade.Image(this.scene,
  this.x + this.width/2, this.y + this.height/2, 'arbolV', 4);

  this.distAttackDmg = 10;
  this.attackHitbox.attackDmg = 20;


  this.attackCooldown = 1;
  this.timeSinceLastIncrement = -1;
  this.bullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true });

  this.inventory = new Inventory();

  this.direction = 'down';
  this.speed = 100;

  this.target;

  this.spriteName = {idle: 'idleStand', down: 'downAnim',}

  this.initSounds();



}


  getHurt(damage){
    this.attackerDmg = damage;
    this.stateMachine.transition('getHurt');
}

  getTarget(targets){
  var distances = [];
  var i;
  var bestDistance;
  var deadTarget;
  var target = targets.getFirstAlive();
  if(target === undefined) {
    return;
  }
  distances[0] = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
  bestDistance = distances[0];
  this.target = target;
  /*if(!targets[0].dead){

    deadTarget = false;
  } else {deadTarget= true;}
*//*
  for(i = 1; i<targets.length; i++){
    distances[i] = Phaser.Math.Distance.Between(this.x, this.y, targets[i].x, targets[i].y);
    if(bestDistance > distances[i] || deadTarget){
      bestDistance = distances[i];
      if(!targets[i].dead){
        this.target = targets[i];
      }
    }
  }
  if(this.target != undefined) {
    this.stateMachine.transition('move');
  }
  */
}
  initSounds() {
      this.hitSound = this.scene.sound.add('hitSound', { loop: false });
      this.hurtSound = this.scene.sound.add('plHurtSound', {loop:false});
    }

}


class P1 extends Actor {
  constructor(newScene, x,y) {
    super(newScene, x,y, 'icy');

    this.stateMachine = new StateMachine('idle', {
      idle: new IdleState(),
      move: new MoveState(),
      attack: new AttackState(),
      distAttack: new DistAttackState(),
      getHurt: new PlayerGetHurtState(),
    }, [this.scene, this]);

    this.spriteName = {idle: 'idle', down: 'down', up: 'up',left:'left',
  right: 'right', death: 'death', punch: 'punch', distAttack: 'distAttack'} ;

    this.attackHitbox.ID = 0;
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
        this.scene.anims.create({
              key: 'distAttack',
              frames: this.scene.anims.generateFrameNumbers('icydistattack', { start:0,end:7 }),
              frameRate: 20,
        });

  }

  initInput() {

    this.keys = this.scene.input.keyboard.addKeys({
     'up': Phaser.Input.Keyboard.KeyCodes.W,
     'down': Phaser.Input.Keyboard.KeyCodes.S,
     'left': Phaser.Input.Keyboard.KeyCodes.A,
     'right': Phaser.Input.Keyboard.KeyCodes.D,
     'inventory': Phaser.Input.Keyboard.KeyCodes.C,
     'sword': Phaser.Input.Keyboard.KeyCodes.ONE,
     'wand': Phaser.Input.Keyboard.KeyCodes.TWO,
     'attack': Phaser.Input.Keyboard.KeyCodes.Q,
     'distAttack': Phaser.Input.Keyboard.KeyCodes.E,
     'esc': Phaser.Input.Keyboard.KeyCodes.ESC
   });

 }

  move() {

    if(!this.dead){
      this.stateMachine.step();
      this.inventory.open(this.keys,this);
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
        distAttack: new DistAttackState(),
        getHurt: new PlayerGetHurtState(),
      }, [this.scene, this]);

      this.spriteName = {idle: 'idleB', down: 'downB', up: 'upB',left:'leftB',
    right: 'rightB', death: 'deathB', distAttack: 'distAttackB'} ;

      this.attackHitbox.ID = 1;

      this.keys;
      this.pad;
      this.buttons;

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
              key: 'distAttackB',
              frames: this.scene.anims.generateFrameNumbers('ycidistattack', { start:0,end:7 }),
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
       'attack': Phaser.Input.Keyboard.KeyCodes.J,
       'distAttack': Phaser.Input.Keyboard.KeyCodes.K
     });
    }

    checkGamepad(scene) {
      if(scene.input.gamepad.total === 1){
      this.control = true;
      this.pad = scene.input.gamepad.getPad(0);
      }
  }

    move() {


      if(!this.dead) {
              this.stateMachine.step();
              this.inventory.open(this.keys,this);

      }
      /*
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



       }
     } else*/
    }
}
