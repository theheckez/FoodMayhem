var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,
  
    initialize:
  
      // Bullet Constructor
      function Bullet(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bolaP1');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
      },
  
    fire: function (shooter, target) {
      this.setPosition(shooter.x, shooter.y); // Initial position
      this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
  
      // Calculate X and y velocity of bullet to moves it from shooter to target
      if (target.y >= this.y) {
        this.xSpeed = this.speed * Math.sin(this.direction);
        this.ySpeed = this.speed * Math.cos(this.direction);
      }
      else {
        this.xSpeed = -this.speed * Math.sin(this.direction);
        this.ySpeed = -this.speed * Math.cos(this.direction);
      }
  
      this.rotation = shooter.rotation; // angle bullet with shooters rotation
      this.born = 0; // Time since new bullet spawned
  
      // this.setActive(false);
      // this.setVisible(false);
  
    },
  
    update: function (time, delta) {
      this.x += this.xSpeed * delta / 2;
      this.y += this.ySpeed * delta / 2;
      this.born += delta;
      if (this.born > 1800) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  
  });
  
  
  var LifeBar = new Phaser.Class({
  
    initialize:
  
      function LifeBar(scene, x, y, xCount, yCount) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.killCount = scene.add.text(xCount, yCount, '0', {
              color: '#000000',
              fontSize: 20,
              //fontStyle: 'bold',
              padding: {
                top: 20,
                bottom: 0,
                left: 20,
                right: 0
              }
            });
        this.x = x;
        this.y = y;
  
  
        this.draw(100);
        this.count(0);
  
        scene.add.existing(this.bar);
      },
  
    draw(playerHp) {
      this.bar.clear();
  
      //  BG
      if (playerHp == 100) {
        this.bar.fillStyle(0x32C93B);
        this.bar.fillRect(this.x, this.y, 132, 10);
      }
      else if (playerHp < 100 && playerHp > 0) {
        var width = (132 / 100) * playerHp;
        this.bar.fillStyle(0x32C93B);
        this.bar.fillRect(this.x, this.y, width, 10);
      }
      else if (playerHp <= 0) {
        this.bar.fillRect(this.x, this.y, 0, 0);
      }
    },
  
    count(kills) {
      this.killCount.text = kills;
    }
  });
  
  var Inventory = new Phaser.Class({
    initialize:
  
    function Inventory() {
      this.invOpen;
      this.invClosed;
      this.swordButtonSelec;
      this.swordButton;
      this.swordSelected = false;
      this.wandButtonSelec;
      this.wandButton;
      this.wandSelected = false;
    },
  
    open: function(keys,player) {
  
      if (Phaser.Input.Keyboard.JustDown(keys['inventory'])) {
        if (this.swordSelected) {
          if (!this.invOpen.visible) {
            console.log("Abre el inventario")
            this.invOpen.visible = true;
            this.invClosed.visible = false;
            this.swordButtonSelec.visible = true;
            this.swordButton.visible = false;
            this.wandButtonSelec.visible = false;
            this.wandButton.visible = true;
          }
          else if (this.invOpen.visible) {
            console.log("ierra el inventario")
            this.invClosed.visible = true;
            this.invOpen.visible = false;
            this.swordButtonSelec.visible = false;
            this.swordButton.visible = false;
            this.wandButtonSelec.visible = false;
            this.wandButton.visible = false;
          }
        }
        else if (this.wandSelected) {
          if (!this.invOpen.visible) {
            console.log("Abre el inventario")
            this.invOpen.visible = true;
            this.invClosed.visible = false;
            this.swordButtonSelec.visible = false;
            this.swordButton.visible = true;
            this.wandButtonSelec.visible = true;
            this.wandButton.visible = false;
          }
          else if (this.invOpen.visible) {
            console.log("ierra el inventario")
            this.invClosed.visible = true;
            this.invOpen.visible = false;
            this.swordButtonSelec.visible = false;
            this.swordButton.visible = false;
            this.wandButtonSelec.visible = false;
            this.wandButton.visible = false;
          }
        }
        else if (!this.wandSelected && !this.swordSelected) {
          if (!this.invOpen.visible) {
            console.log("Abre el inventario")
            this.invOpen.visible = true;
            this.invClosed.visible = false;
            this.swordButtonSelec.visible = false;
            this.swordButton.visible = true;
            this.wandButtonSelec.visible = false;
            this.wandButton.visible = true;
          }
          else if (this.invOpen.visible) {
            console.log("ierra el inventario")
            this.invClosed.visible = true;
            this.invOpen.visible = false;
            this.swordButtonSelec.visible = false;
            this.swordButton.visible = false;
            this.wandButtonSelec.visible = false;
            this.wandButton.visible = false;
          }
        }
      }
  
      if (Phaser.Input.Keyboard.JustDown(keys['sword'])) {
        if (this.invOpen.visible) {
          if (!this.swordButtonSelec.visible) {
            this.swordButtonSelec.visible = true;
            this.swordButton.visible = false;
            this.wandButtonSelec.visible = false;
            this.wandButton.visible = true;
            this.swordSelected = true;
            this.wanddSelected = false;
          } else if (this.swordButtonSelec.visible) {
            this.swordButtonSelec.visible = false;
            this.swordButton.visible = true;
            //this.wandButtonSelec.visible = false;
           // this.wanddButton.visible = true;
            this.swordSelected = false;
          }
        }
      }
  
      if (Phaser.Input.Keyboard.JustDown(keys['wand'])) {
        if (this.invOpen.visible) {
          if (!this.wandButtonSelec.visible) {
            this.swordButtonSelec.visible = false;
            this.swordButton.visible = true;
            this.wandButtonSelec.visible = true;
            this.wandButton.visible = false;
            this.swordSelected = false;
            this.wanddSelected = true;
          } else if (this.wandButtonSelec.visible) {
            //this.swordButtonSelec.visible = false;
            //this.swordButton.visible = true;
            this.wandButtonSelec.visible = false;
            this.wandButton.visible = true;
            this.wandSelected = false;
          }
        }
      }
  
      if(this.swordSelected){
        player.attackHitbox.attackDmg = 30;
      }
      if(this.wandSelected){
        player.distAttackDmg = 30;
      }
  
    },
  
    init: function(scene) {
      this.invOpen = scene.add.image(120, 560, 'inventoryOpenP1').setVisible(false);
      this.invClosed = scene.add.image(49, 560, 'inventoryClosedP1');
      this.swordButtonSelec = scene.add.image(100, 560, 'swordSelec').setVisible(false);
      this.swordButton = scene.add.image(100, 560, 'sword').setVisible(false);
      this.wandButtonSelec = scene.add.image(130, 560, 'wandSelec').setVisible(false);
      this.wandButton = scene.add.image(130, 560, 'wand').setVisible(false);
    },
  
    init2: function(scene) {
      this.invOpen = scene.add.image(680, 560, 'inventoryOpenP2').setVisible(false);
      this.invClosed = scene.add.image(750, 560, 'inventoryClosedP2');
      this.swordButtonSelec = scene.add.image(700, 560, 'swordSelec').setVisible(false);
      this.swordButton = scene.add.image(700, 560, 'sword').setVisible(false);
      this.wandButtonSelec = scene.add.image(670, 560, 'wandSelec').setVisible(false);
      this.wandButton = scene.add.image(670, 560, 'wand').setVisible(false);
    }
  
  })