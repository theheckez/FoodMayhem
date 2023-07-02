/* global Phaser */

class EnemyMM extends Phaser.Physics.Arcade.Sprite{
constructor(newScene, x,y, sprite) {
  super(newScene, x,y, sprite);

  this.scene = newScene;
  this.dead = false;

  this.death = this.scene.sound.add('mlvDeadSound', { loop: false });
  
  this.target;
  this.scene.add.existing(this);
  this.scene.physics.add.existing(this);
  this.setCollideWorldBounds(true);
}

  getTarget(){
    var distances = [];
    var i;
    var bestDistance;
    var deadTarget;
    distances[0] = Phaser.Math.Distance.Between(this.x, this.y, this.targets[0].x, this.targets[0].y);
    bestDistance = distances[0];
    if(!this.targets[0].dead){
      this.target = this.targets[0];
      deadTarget = false;
    } else {deadTarget= true;}

    for(i = 1; i<this.targets.length; i++){
      distances[i] = Phaser.Math.Distance.Between(this.x, this.y, this.targets[i].x, this.targets[i].y);
      if(bestDistance > distances[i] || deadTarget){
        bestDistance = distances[i];
        if(!this.targets[i].dead){
          this.target = this.targets[i];
        }
      }
    }
    if(this.target != undefined) {
      this.stateMachine.transition('move');
    }
  }

  getHurt(attack, id) {
    this.attackerDmg = attack;
    this.attackerID = id;
    this.stateMachine.transition('getHurt');
  }

  initEnemy(targets) {
    this.targets = targets;
    this.stateMachine.step();
  }
}

class Malvin extends EnemyMM {
  constructor(newScene, x,y) {
    super(newScene, x,y, 'malvin');

    this.health = 100;
    this.speed = 30;

    this.attackDmg = 5;
    this.attackRange = 50;
    this.attackCooldown = 3;



    this.timeSinceLastIncrement = -3;
    this.actualTime;

    this.spriteName = {move: 'malvinDown', moveU:'malvinUp', moveL:'malvinLeft',
    moveR:'malvinRight',death: 'malvinDeath', attack: 'malvinAttack'} ;

    this.stateMachine = new StateMachine('idle', {
      idle: new IdleEnemyState(),
      move: new HuntState(),
      attack: new EnemyAttackState(),
      getHurt: new GetHurtState(),
    }, [this.scene, this]);


    this.initAnimations();
  }

  initAnimations() {
    this.scene.anims.create({
      key:'malvinDown',
      frames: this.scene.anims.generateFrameNumbers('malvin', {start:0,end:5}),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key:'malvinUp',
      frames:this.scene.anims.generateFrameNumbers('malvin', {start:6,end:11}),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'malvinRight',
      frames: this.scene.anims.generateFrameNumbers('malvin', {start:12,end:15}),
      frameRate:10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'malvinLeft',
      frames: this.scene.anims.generateFrameNumbers('malvin', {start:18,end:21}),
      frameRate:10,
      repeat: -1
    })

      this.scene.anims.create({
          key: 'malvinAttack',
          frames: this.scene.anims.generateFrameNumbers('malvinattack', { start: 0, end: 3 }),
          frameRate: 10,
        });

      this.scene.anims.create({
            key: 'malvinDeath',
            frames: this.scene.anims.generateFrameNumbers('malvindeath', { start: 0, end: 10 }),
            frameRate: 10,
          });
  }
}

class DemonBoss extends EnemyMM {
  constructor(newScene, x,y) {
    super(newScene, x,y, 'demon');

    this.health = 300;
    this.speed = 10;

    this.attackDmg = 20;
    this.attackRange = 30;
    this.attackCooldown = 4;

    this.timeSinceLastIncrement = -4;
    this.actualTime;

    this.spriteName = {move: 'demonIdle', attack: 'demonAttack'} ;

    this.stateMachine = new StateMachine('idle', {
      idle: new IdleEnemyState(),
      move: new HuntState(),
      attack: new EnemyAttackState(),
      getHurt: new GetHurtState(),
    }, [this.scene, this]);

    this.initAnimations();
  }

  initAnimations() {
    this.scene.anims.create({
      key:'demonIdle',
      frames: this.scene.anims.generateFrameNumbers('demon', {start:0,end:3}),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key:'demonAttack',
      frames:this.scene.anims.generateFrameNumbers('demon', {start:4,end:7}),
      frameRate: 10,
    });

    this.anims.play('demonIdle');
  }
}
