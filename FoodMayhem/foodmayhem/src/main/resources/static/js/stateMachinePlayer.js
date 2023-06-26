/* global Phaser */

  class StateMachine {
  constructor(initialState, possibleStates, stateArgs=[]) {
    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;
    this.state = null;

    // State instances get access to the state machine via this.stateMachine.
    for (const state of Object.values(this.possibleStates)) {
      state.stateMachine = this;
    }
  }

  step() {
    // On the first step, the state is null and we need to initialize the first state.
    if (this.state === null) {
      this.state = this.initialState;
      this.possibleStates[this.state].enter(...this.stateArgs);
    }

    // Run the current state's execute
    this.possibleStates[this.state].execute(...this.stateArgs);
  }

  transition(newState, ...enterArgs) {
    this.state = newState;
    this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
  }
}

class State {
  enter() {

  }

  execute() {

  }
}

class IdleState extends State {
  enter(scene,player) {
    player.setVelocity(0);
    player.anims.play(player.spriteName.idle);
  }

  execute(scene, player) {

  if (player.keys['attack'].isDown) {
    this.stateMachine.transition('attack');
    return;
  }
  if (player.keys['distAttack'].isDown) {
    this.stateMachine.transition('distAttack');
    return;
  }
      if(player.control){
        if(player.pad.isButtonDown(2)){
          this.stateMachine.transition('attack');
          return;
        }

        if(player.pad.isButtonDown(3)){
          this.stateMachine.transition('distAttack');
          return;
        }
        if(player.pad.axes.length){
          this.stateMachine.transition('move');
          return;

        }
      }
    // Transition to move if pressing a movement key
    if (player.keys['left'].isDown || player.keys['up'].isDown ||
    player.keys['down'].isDown  || player.keys['right'].isDown ) {
      this.stateMachine.transition('move');
      return;
    }
  }
}


class MoveState extends State {
  execute(scene, player) {

    if (Phaser.Input.Keyboard.JustDown(player.keys['attack'])) {
      this.stateMachine.transition('attack');
      return;
    }
    if (player.keys['distAttack'].isDown) {
      this.stateMachine.transition('distAttack');
      return;
    }

    if(player.control){

    player.setVelocity(0);

    var axisH = player.pad.axes[0].getValue();
    var axisV = player.pad.axes[1].getValue();

    if(!axisH && !axisV){
      player.stateMachine.transition('idle');
      return;
    }

    if(player.pad.isButtonDown(2)){
      this.stateMachine.transition('attack');
      return;
    }

    if(player.pad.isButtonDown(3)){
      this.stateMachine.transition('distAttack');
      return;
    }
    player.setVelocityX(player.speed * axisH);
    player.setVelocityY(player.speed * axisV);

    if(axisH < 0) {
    player.anims.play('leftB',true);
    } else if(axisH > 0) {
    player.anims.play('rightB',true);
    }
    else if(axisV<0) {
     player.anims.play('upB',true);
    } else if (axisV >0){
     player.anims.play('downB',true);
    }

  } else {

    if (!(player.keys['left'].isDown || player.keys['up'].isDown ||
      player.keys['down'].isDown  || player.keys['right'].isDown)) {

        this.stateMachine.transition('idle');
        return;
      }

      player.setVelocity(0);

      if (player.keys['left'].isDown) {
        player.setVelocityX(-100);
        player.direction = 'left';
        player.anims.play(player.spriteName.left, true);
      } else if (player.keys['right'].isDown) {
        player.setVelocityX(100);
        player.direction = 'right';
        player.anims.play(player.spriteName.right, true);
      }
      if (player.keys['up'].isDown) {
        player.setVelocityY(-player.speed);
        player.direction = 'up';
        player.anims.play(player.spriteName.up, true);
      } else if (player.keys['down'].isDown) {
        player.setVelocityY(player.speed);
        player.direction = 'down';
        player.anims.play(player.spriteName.down, true);
      }
  }

  }
}

class IdleEnemyState extends State {
  enter(scene, enemy) {
    enemy.setVelocity(0);
    enemy.anims.play(enemy.spriteName.move);
    enemy.anims.stop();
  }

  execute(scene,enemy){
      this.stateMachine.transition('move');
  }
  }

  class HuntState extends State {
    execute(scene, enemy) {

      if(enemy.targets[0].dead && enemy.targets[1].dead ) {
      this.stateMachine.transition('idle');
      return;
      }
      enemy.getTarget();
      enemy.direction = new Phaser.Math.Vector2(enemy.target.x - enemy.x, enemy.target.y - enemy.y);
      enemy.module = enemy.direction.length();

      if(enemy.module < enemy.attackRange) {
        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        this.stateMachine.transition('attack');
        return;
        } else{
        enemy.setVelocityX((enemy.direction.x/enemy.module) * enemy.speed);
        enemy.setVelocityY((enemy.direction.y/enemy.module) * enemy.speed);
        }

        if(enemy.direction.y>0){
          if(enemy.spriteName.move !== undefined)enemy.anims.play(enemy.spriteName.move,true);
        } else if(enemy.direction.y<0) {
          if(enemy.spriteName.moveU !== undefined){enemy.anims.play(enemy.spriteName.moveU,true)}else{
            enemy.anims.play(enemy.spriteName.move,true)
          }
        }

    }
  }

  class EnemyAttackState extends State {
    enter(scene, enemy) {
      enemy.actualTime = enemy.scene.time.now/1000;

      if(enemy.actualTime>(enemy.timeSinceLastIncrement+enemy.attackCooldown)){
        enemy.anims.play('malvinAttack', true);
        enemy.target.getHurt(enemy.attackDmg);

        enemy.timeSinceLastIncrement = scene.time.now/1000;
      }

      scene.time.delayedCall(250, () => {
        this.stateMachine.transition('move');
      });

    }
  }


    class PlayerGetHurtState extends State {
      enter(scene, player) {

        player.health -= player.attackerDmg;
        player.lifeBar.draw(player.health);
        player.anims.play('getHurt',true);
        player.hurtSound.play();
        if(player.health <= 0 && !player.dead){
          player.setVelocity(0);
          player.dead = true;
          player.anims.play(player.spriteName.death,true);

        }

        if(!player.dead){
          scene.time.delayedCall(200, () => {
            this.stateMachine.transition('move');
          });
        }


      }
    }

  class GetHurtState extends State {
    enter(scene, enemy) {

      enemy.health -= enemy.attackerDmg;

      if(enemy.health <= 0 && !enemy.dead){
        enemy.setVelocity(0);
        enemy.dead = true;
        enemy.anims.play('malvinDeath',true);
      }

      if(enemy.dead){
        enemy.death.play();
        scene.time.delayedCall(1000, () => {
          if(enemy.attackerID === 0) {
            player1.lifeBar.kills++;
            player1.lifeBar.count();
          } else if(enemy.attackerID === 1) {
            player2.lifeBar.kills++;
            player2.lifeBar.count();
          }
          enemy.destroy();
        });
      } else {
          this.stateMachine.transition('move');
      }
    }
  }



class AttackState extends State {
  enter(scene, player) {
    player.actualTime = scene.time.now / 1000;

    if (player.actualTime > (player.timeSinceLastIncrement + player.attackCooldown)) {

      player.setVelocityX(0);
      player.setVelocityY(0);

      if(player.spriteName.punch !== undefined){player.anims.play(`punch-${player.direction}`)}
      else {
          player.anims.play(`punchB-${player.direction}`)
      };

      player.attackHitbox.x = player.x + player.body.halfWidth/2;
      player.attackHitbox.y = player.y + player.body.halfHeight/2;

      scene.physics.add.existing(player.attackHitbox);
      player.attackHitbox.setCircle(player.attackRange)

      player.hitSound.play();

      player.timeSinceLastIncrement = scene.time.now / 1000;

      scene.time.delayedCall(250, () => {
        player.attackHitbox.body.enable = false;
        scene.physics.world.remove(player.attackHitbox.body);
        this.stateMachine.transition('idle');
      });
    } else {

            this.stateMachine.transition('idle');
    }


  }
}

class DistAttackState extends State {
  enter(scene, player) {
    player.actualTime = scene.time.now / 1000;
    player.getTarget(scene.enemies);
        console.log(player.target)
    if(player.target === undefined) {

              this.stateMachine.transition('idle');
    }
      if (player.actualTime > (player.timeSinceLastIncrement + player.attackCooldown)) {
        player.setVelocityX(0);
        player.setVelocityY(0);
        // Get bullet from bullets group
        var bullet = player.bullets.get().setActive(true).setVisible(true);
        if (bullet) {
          player.anims.play(player.spriteName.distAttack);
          bullet.fire(player, player.target);
          scene.physics.add.collider(player.target, bullet, function (target, bull) {
            target.getHurt(player.distAttackDmg);
            // Destroy bullet
            bull.setActive(false).setVisible(false);
          });

          player.timeSinceLastIncrement = scene.time.now / 1000;
        }
      }
      scene.time.delayedCall(250, () => {
        this.stateMachine.transition('idle');
      });
  }
}





class DashState extends State {
  enter(scene, hero) {
    hero.setVelocity(0);
    hero.anims.play(`swing-${hero.direction}`);
    switch (hero.direction) {
      case 'up':
        hero.setVelocityY(-300);
        break;
      case 'down':
        hero.setVelocityY(300);
        break;
      case 'left':
        hero.setVelocityX(-300);
        break;
      case 'right':
        hero.setVelocityX(300);
        break;
    }

    // Wait a third of a second and then go back to idle
    scene.time.delayedCall(300, () => {
      this.stateMachine.transition('idle');
    });
  }
}
