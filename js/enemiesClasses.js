/* global Phaser */

class EnemyMM extends Phaser.Physics.Arcade.Sprite{
constructor(newScene, x,y, sprite) {
  super(newScene, x,y, 'malvin');

  this.scene = newScene;
  this.dead = false;

  this.target;
  this.scene.add.existing(this);
  this.scene.physics.add.existing(this);
  this.setCollideWorldBounds(true);
}

  hunt(targets) {
  if(!targets[0].dead || !targets[1].dead ){
  this.getTarget(targets);
  if(!this.dead){

    this.direction = new Phaser.Math.Vector2(this.target.x - this.x, this.target.y - this.y);
    this.module = this.direction.length();

  /*  if(this.direction.x > 0 && !(this.anims.getCurrentKey() === 'malvinUp' || this.anims.getCurrentKey() === 'malvinDown') ) {
      this.anims.play('malvinRight',true);
    } else if(this.direction.x < 0 && !(this.anims.getCurrentKey() === 'malvinUp' || this.anims.getCurrentKey() === 'malvinDown') ) {
      this.anims.play('malvinLeft',true);
    };

    if(this.direction.y>0 && !(this.anims.getCurrentKey() === 'malvinattack')) {
      this.anims.play('malvinDown',true)
    } else if(this.direction.y <0 && !(this.anims.getCurrentKey() === 'malvinattack')) {
      this.anims.play('malvinUp',true);
    }*/

    if(this.module < this.attackRange) {
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.attack(this.target);
      } else{
      this.setVelocityX((this.direction.x/this.module) * this.speed);
      this.setVelocityY((this.direction.y/this.module) * this.speed);
      }
      }
      } else{
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.anims.stop();
      }
  }

  attack(targets) {
    this.actualTime = this.scene.time.now/1000;

    if(this.actualTime>(this.timeSinceLastIncrement+this.attackCooldown)){
      this.anims.play('malvinAttack', true);
      targets.health-= this.attackDmg;
      console.log(targets.health);
      //targets.lifeBar.setCrop(0, 0, targets.health * 2, 32);
      this.timeSinceLastIncrement = this.scene.time.now/1000;
    }

  }

  getTarget(targets) {
    var distances = [];
    var i;
    var bestDistance;

    distances[0] = Phaser.Math.Distance.Between(this.x, this.y, targets[0].x, targets[0].y);
    bestDistance = distances[0];
    if(!targets[0].dead){
      this.target = targets[0];
    }

    for(i = 1; i<targets.length; i++){
      distances[i] = Phaser.Math.Distance.Between(this.x, this.y, targets[i].x, targets[i].y);
      if(bestDistance > distances[i] || this.target.dead){
        bestDistance = distances[i];
        if(!targets[i].dead){
          this.target = targets[i];
        }
      }
    }
  }

  getHurt() {
    console.log("Reciben daño")
    this.health -= 10;
    if(this.health === 0 && !this.dead){
      console.log("Se mueren")
      this.dead = true;
      this.destroy();
    }
  }
}


class Malvin extends EnemyMM {
  constructor(newScene, x,y) {
    super(newScene, x,y, 'malvin');

    this.health = 100;
    this.speed = 70;

    this.attackDmg = 10;
    this.attackRange = 50;
    this.attackCooldown = 3;

    this.timeSinceLastIncrement = -3;
    this.actualTime;

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
        key: 'malvinDie',
        frames: this.scene.anims.generateFrameNumbers('icyattack', { start: 36, end: 44 }),
        frameRate: 10,
      });

      this.scene.anims.create({
          key: 'malvinAttack',
          frames: this.scene.anims.generateFrameNumbers('malvinattack', { start: 0, end: 3 }),
          frameRate: 10,
        });

  }
}
