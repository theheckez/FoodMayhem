var PantallaInicio = new Phaser.Class({
    Extends: Phaser.Scene,
  
    initialize:
  
    function PantallaInicio() {
      Phaser.Scene.call(this, {key: 'PantallaInicio'});
    },
  
    preload: function(){
      this.load.image("logo", "assets/logo/LogoI-ScreamFondoBlanco.png");
        this.load.spritesheet('BotonPlay',
            'assets/interfaz/BotonPlay.png',
            { frameWidth: 120, frameHeight: 47 }
        );
        this.load.image("bg", "assets/interfaz/pantallaInicio.png");
    },
    create: function(){
        //this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "star");
        this.add.image(400, 300, "bg");
    this.logo = this.add.image(game.renderer.width/2, 200, "logo").setOriginFromFrame('center');
    this.logo.setScale(1.2);
    this.playButton = this.add.sprite(game.renderer.width/2, 350, "BotonPlay").setInteractive();
    this.playButton.setScale(1.2);
    //Interaccion botones
    this.playButton.on("pointerover", ()=>{
        document.body.style.cursor = "pointer";
    })
  
    this.playButton.on("pointerout", ()=>{
        document.body.style.cursor = "auto";
    })
  
    this.playButton.on("pointerdown", ()=>{
        this.playButton.setFrame(1);
    })
  
    this.playButton.on("pointerup", ()=>{
        document.body.style.cursor = "auto";
        this.scene.start("chSelect");
    })},
  
    update: function(time, delta)
    {
        this.playButton.on("pointerover", ()=>{
            this.playButton.setFrame(1);
        })
  
        this.playButton.on("pointerout", ()=>{
            this.playButton.setFrame(0);
        })
  
  
    }
  });
  
  
  var PantallaCarga = new Phaser.Class({
    Extends: Phaser.Scene,
  
    initialize:
  
    function PantallaCarga(){
      Phaser.Scene.call(this, {key: 'PantallaCarga'});
    },
  
    preload: function(){
         //Pantalla de carga
  
         this.load.image("empresa", 'assets/logo/BakeryStudiosLogo.png');
  
         let loadingBar = this.add.graphics({
             fillStyle: {
                 color: 0xde72ca
             }
         })
    this.load.image('iconoJ1', 'assets/interfaz/cabezaMorada.png');
  
         //-------------------------------------------------------
  
         //Menu de Inicio
  
  
  
         //------------------------------------------------------
  
         //Pantalla seleccion personaje
  
  
  
  
         //-----------------------------------------------------------------------------------
         //Escenario:
         this.load.spritesheet('pause',
             'assets/interfaz/botonPause.png',
             { frameWidth: 80, frameHeight: 47 }
         );
  
         //------------------------------------------------------------------------------------
  
         //Menu Pausa
  
  
         this.load.on("progress", (percent)=>{
           this.time.delayedCall(1000, () => {
             loadingBar.fillRect(100, 350, 600*percent, 40);
             console.log(percent);
           });
  
         })
  
         this.load.on("complete", ()=>{
             console.log('done');
         })
         //Pesta??a aviso
  
  
  
     },
     create: function (){
         this.add.image(400, 250, 'empresa');
         this.helado = this.add.image(100, 370, 'iconoJ1');
         this.helado.scale = 1.3;
  
         this.time.delayedCall(2000, () => {
             this.scene.start('PantallaInicio');
         });
     }
  });
  
  class PantallaPausa extends Phaser.Scene {
      constructor(){
          super({key: 'PantallaPausa'});
      }
      preload(){
        //Background:
        this.load.image("stop", "assets/interfaz/pantallaPausa.png");
        //Botones
        //x
        this.load.spritesheet('exit',
            'assets/interfaz/botonX.png',
            { frameWidth: 80, frameHeight: 47 }
        );
  
        //Iconos:
        this.load.image('iconoJ1', 'assets/interfaz/cabezaMorada.png');
        this.load.image('iconoJ2', 'assets/interfaz/cabezaAzul.png');
  
        //Variables
        //Barra vida:
        this.load.image('vidaJ1', 'assets/interfaz/fondoBarraP1.png');
        this.load.image('vidaJ2', 'assets/interfaz/fondoBarraP2.png');
        this.load.image('p2', 'assets/interfaz/cabezaAzul.png');
        this.load.image('p1', 'assets/interfaz/cabezaMorada.png');
        this.load.image('nivelVidaJ1', 'assets/interfaz/bar1.png');
        this.load.image('aviso', 'assets/interfaz/pesta??aAviso.png');
  
        this.load.spritesheet('yes', 'assets/interfaz/botonYes.png', { frameWidth: 120, frameHeight: 47});
        this.load.spritesheet('no', 'assets/interfaz/botonNo.png', { frameWidth: 120, frameHeight: 47});
        this.load.spritesheet('menu',
            'assets/interfaz/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 }
        );
  
      }
      create(){
          //CREACION ESCENA
          //Background
          this.add.image(400, 300, "stop");
  
          //Titulo PAUSA
          //Modo de juego:
          const confTitulo = {
              origin: 'center',
              x: game.renderer.width/2,
              y: 100,
              text: 'PAUSA',
              style: {
                  color: '#000000',
                  fontSize: 30,
                  fontFamily: 'titulo',
                  fontStyle: 'italic'
              }
          }
          this.make.text(confTitulo);
  
          //Recuadro
          let recuadroP = this.add.graphics({
              fillStyle: {
                  color: 0xc0d470, //color barra de cargar (CAMBIAR)
                  alpha: 0.4,
              }
          })
  
          recuadroP.fillRect(80, 140, 640, 300);
          let resaltarP = this.add.graphics({
              fillStyle: {
                  color: 0xc0d470, //color barra de cargar (CAMBIAR)
                  alpha: 0.8
              }
          })
          resaltarP.fillRect(80, 140, 640, 75);
  
          //Botones
          //x
          this.exit = this.add.sprite(710, 70, "exit").setInteractive();
          this.exit.setScale (0.8);
          //menu
          this.menu = this.add.sprite(400, 500, "menu").setInteractive();
  
          //Jugadores
          const confJugadores = {
              origin: 'center',
              x: 240,
              y: 180,
              style: {
                  fontFamily: 'estilo',
                  color: '#000000',
                  fontSize: 25,
                  fontStyle: 'bold',
                  textAlign: 'center',
                  justifyContent: 'center',
              }
          }
          //this.make.text(confJugadores).setText(player1.text); --> PONERLO ASI
          //this.make.text(confJugadores).setText(player2.text).setPosition(this.game.renderer.width*3/4, 150); --> PONERLO ASI
          this.make.text(confJugadores).setText('Player 1');
          this.make.text(confJugadores).setText('Player 2').setPosition(game.renderer.width*3/4, 180);
          //Iconos jugadores
          this.add.image(140, 180, 'iconoJ1');
          this.add.image(500, 180, 'iconoJ2');
  
          //Variables
          const confVariables = {
              origin: 'right',
              x: 120,
              y: 270,
              style: {
                  fontFamily: 'estilo',
                  color: '#0000000',
                  fontSize: 20,
              }
          }
          //Vida
          this.make.text(confVariables).setText('Health');
          this.add.image(260, 270, 'vidaJ1');
  
          this.make.text(confVariables).setText('Health').setPosition(470, 270);
          this.add.image(610, 270, 'vidaJ2');
  
          let vidaJ1 = this.add.graphics({
              fillStyle: {
                  color: 0x32C93B
              }
          })
          //Vida Jugador 1:
          if(player1.health == 100) {
              vidaJ1.fillRect(214, 260, 132, 10);
          } else if (player1.health < 100 && player1.health > 0) {
              vidaJ1.fillRect(214, 260, (132/100)*player1.health, 10);
          } else if (player1.health <= 0) {
              vidaJ1.fillRect(214, 260, 0, 10);
          }
          //Vida Jugador 2:
          if(player2.health == 100) {
              vidaJ1.fillRect(657, 260, -132, 10);
          } else if (player2.health < 100 && player1.health > 0) {
              vidaJ1.fillRect(657, 260, -(132/100)*player2.health, 10);
          } else if (player2.health <= 0) {
              vidaJ1.fillRect(657, 260, 0, 10);
          }
  
          this.add.image(195, 265, 'p1');
      this.add.image(675, 265, 'p2');
          //Da??o de ataque
          this.make.text(confVariables).setText('Strength').setPosition(140, 350);
          this.make.text(confVariables).setText('Strength').setPosition(490, 350);
  
          const confDamage = {
              origin: 'right',
              x: 270,
              y: 350,
              style: {
                  color: '#ecab0f',
                  fontFamily: 'damage',
                  fontSize: 30
              }
          }
          this.make.text(confDamage).setText('x'+player1.attackHitbox.attackDmg);
          this.make.text(confDamage).setText('x'+player2.attackHitbox.attackDmg).setPosition(610, 350);
  
          //Mensaje abandonar partida
          //tapar fondo
          this.niebla = this.add.graphics({
              fillStyle: {
                  color: 0x828282, //color barra de cargar (CAMBIAR)
                  alpha: 0.4,
              }
          })
          this.niebla.fillRect(0, 0, 800, 600).setVisible(false);
          this.pesta??a = this.add.image(400, 300, 'aviso').setVisible(false);
          this.abandonar = this.make.text(confVariables).setText(
              '??Abandonar la partida?').setPosition(
                  400, 230).setFontSize(25).setVisible(false);
          //warning
          //x
          this.exit2 = this.add.sprite(625, 185, "exit").setVisible(false);
          this.exit2.scale = 0.6;
          //yes y no
          this.yes = this.add.sprite(300, 350, 'yes').setVisible(false);
          this.no = this.add.sprite(500, 350, 'no').setVisible(false);
  
          //FUNCIONALIDADES
          //exit
          this.exit.on("pointerover", ()=>{
              document.body.style.cursor = "pointer";
          })
          this.exit.on("pointerout", ()=>{
              document.body.style.cursor = "auto";
          })
          this.exit.on("pointerdown", ()=>{
              this.exit.setFrame(1);
          })
          this.exit.on("pointerup", ()=>{
              document.body.style.cursor = "auto";
              this.scene.wake("mainGame");
              this.scene.sleep();
          })
          //menu
          this.menu.on("pointerover", ()=>{
              document.body.style.cursor = "pointer";
          })
          this.menu.on("pointerout", ()=>{
              document.body.style.cursor = "auto";
          })
          this.menu.on("pointerdown", ()=>{
              this.menu.setFrame(1);
          })
          this.menu.on("pointerup", ()=>{
              this.menu.setFrame(0);
              document.body.style.cursor = "auto";
              this.niebla.setVisible(true);
              this.pesta??a.setVisible(true);
              this.abandonar.setVisible(true);
              this.exit2.setVisible(true).setInteractive();
              this.yes.setVisible(true).setInteractive();
              this.no.setVisible(true).setInteractive();
              this.menu.disableInteractive();
              this.exit.disableInteractive();
          })
          //exit2
          this.exit2.on("pointerover", ()=>{
              document.body.style.cursor = "pointer";
          })
          this.exit2.on("pointerout", ()=>{
              document.body.style.cursor = "auto";
          })
          this.exit2.on("pointerdown", ()=>{
              this.exit2.setFrame(1);
          })
          this.exit2.on("pointerup", ()=>{
              this.exit2.setFrame(0);
              document.body.style.cursor = "auto";
              this.niebla.setVisible(false);
              this.pesta??a.setVisible(false);
              this.abandonar.setVisible(false);
              this.exit2.setVisible(false).disableInteractive();
              this.yes.setVisible(false).disableInteractive();
              this.no.setVisible(false).disableInteractive();
              this.menu.setInteractive();
              this.exit.setInteractive();
          })
          //yes
          this.yes.on("pointerover", ()=>{
              document.body.style.cursor = "pointer";
          })
          this.yes.on("pointerout", ()=>{
              document.body.style.cursor = "auto";
          })
          this.yes.on("pointerdown", ()=>{
              this.yes.setFrame(1);
          })
          this.yes.on("pointerup", ()=>{
              document.body.style.cursor = "auto";
              this.scene.start("PantallaInicio");
          })
          //no
          this.no.on("pointerover", ()=>{
              document.body.style.cursor = "pointer";
          })
          this.no.on("pointerout", ()=>{
              document.body.style.cursor = "auto";
          })
          this.no.on("pointerdown", ()=>{
              this.no.setFrame(1);
          })
          this.no.on("pointerup", ()=>{
              this.no.setFrame(0);
              document.body.style.cursor = "auto";
              this.niebla.setVisible(false);
              this.pesta??a.setVisible(false);
              this.abandonar.setVisible(false);
              this.exit2.setVisible(false).disableInteractive();
              this.yes.setVisible(false).disableInteractive();
              this.no.setVisible(false).disableInteractive();
              this.menu.setInteractive();
              this.exit.setInteractive();
          })
  
      }
  };
  
  var CharacterSelect = new Phaser.Class({
    Extends: Phaser.Scene,
  
    initialize:
  
    function CharacterSelect(){
      Phaser.Scene.call(this, {key: 'chSelect'});
    },
    preload: function() {
        this.load.spritesheet('player',
          'assets/players/icy.png',
          { frameWidth: 64, frameHeight: 64 })
          this.load.image("bg", "assets/interfaz/pantallaInicio.png");
         this.load.image("bg2", "assets/interfaz/pantallaSeleccion.png");
         this.load.image("cuadro", "assets/interfaz/eleccionPersonaje.png");
         //Cargar letras:
         this.add.text(0, 0, '', {fontFamily: 'estilo'});
         this.add.text(0, 0, '', {fontFamily: 'titulo'});
         this.add.text(0, 0, '', {fontFamily: 'damage'});
         //Cargar fondo:
         this.load.image('name', 'assets/interfaz/recuadroTexto.png');
   this.load.spritesheet('icyB', 'assets/players/Yci.png', { frameWidth: 64, frameHeight: 64 });
         //Aceptar
         this.load.spritesheet('aceptar',
             'assets/interfaz/botonOk.png',
             { frameWidth: 120, frameHeight: 47 }
         );
         //Menu
         this.load.spritesheet('menu',
             'assets/interfaz/botonMenu.png',
             { frameWidth: 120, frameHeight: 47 }
         );
         //Play
         this.load.spritesheet('play',
             'assets/interfaz/BotonPlay.png',
             { frameWidth: 120, frameHeight: 47 }
         );
  
         //flecha modo juego
         this.load.image("flechita", "assets/interfaz/flechita.png");
  
    },
    create: function(){
      //CREACION ESCENA:
           //Fondo:
           this.add.image(400, 300, 'bg2');
  
           //Recuadro personaje 1
           this.rec = this.add.image(210, 170, "cuadro");
           this.rec.setScale(3.5);
           //Recuadro personaje 2
           this.rec2 = this.add.image(590, 170, "cuadro");
           this.rec2.setScale(3.5);
  
           //Personaje 1
           this.player1 = this.add.sprite(210, 170, 'player').setInteractive();
           this.player1.setFrame(3);
           this.player1.setScale(3);
           //Personaje 2
           this.player2 = this.add.sprite(590, 170, 'player').setInteractive();
           this.player2.setFrame(3);
           this.player2.setScale(3);
  
           //Configuracion texto:
           const configNombres = {
               origin: 'center',
               x: 210,
               y: 290,
               text: 'Introduce tu nombre:',
               style: {
                   fontFamily: 'estilo',
                   color: '#000000',
                   fontSize: 20,
                   textAlign: 'center',
                   justifyContent: 'center',
                   backgroundImage: "url('name')"
               }
           }
           //Nombre jugador 1:
           player1T = this.make.text(configNombres).setInteractive();
           //Nombre jugador 2:
           player2T = this.make.text(configNombres).setInteractive();
           player2T.setPosition(590, 290);
  
           //Botones aceptar: bloquean introducir nombre y van a siguiente pantalla
           this.aceptar1 = this.add.sprite(210, 330, "aceptar").setInteractive();
           this.aceptar2 = this.add.sprite(590, 330, "aceptar").setInteractive();
  
  
           //Recuadro Modo juego
           let recuadroMJ = this.add.graphics({
               fillStyle: {
                   color: 0xa87bc7, //color barra de cargar (CAMBIAR)
                   alpha: 0.5,
               }
           })
  
           recuadroMJ.fillRect(46, 360, 705, 195);
           let resaltarMJ = this.add.graphics({
               fillStyle: {
                   color: 0x734a91, //color barra de cargar (CAMBIAR)
                   alpha: 0.5
               }
           })
           resaltarMJ.fillRect(46, 360, 705, 35);
           //resaltarMJ.lineGradientStyle(200, 0, 600, 380, 0);
  
  
           //Boton menu: volver al menu
           this.menu = this.add.sprite(695, 525, "menu").setInteractive();
  
           //Boton play
           this.play = this.add.sprite(695, 480, "play").setInteractive();
           this.play.setVisible(false);
  
           //Modo de juego:
           const confTittle = {
               origin: 'center',
               x: game.renderer.width/2,
               y: 380,
               text: 'MODO DE JUEGO',
               style: {
                   color: '#ffffff',
                   fontSize: 20,
                   fontFamily: 'titulo'
               }
           }
           this.make.text(confTittle);
  
           const configModos = {
               origin: 'center',
               style: {
                   fontFamily: 'estilo',
                   color: '#ffffff',
                   fontSize: 20,
                   fontStyle: 'italic',
                   textAlign: 'center',
                   justifyContent: 'center',
               }
           }
  
           this.modoCamp = this.make.text(configModos).setInteractive();
           this.modoCamp.setText('Campa??a');
           this.modoCamp.setAlpha(0.5);
           this.modoCamp.setPosition(game.renderer.width/2, 420);
  
           this.modoVersus = this.make.text(configModos).setInteractive();
           this.modoVersus.setText('Versus');
           this.modoVersus.setAlpha(0.5);
           this.modoVersus.setPosition(game.renderer.width/2, 460);
  
           this.modoArc = this.make.text(configModos).setInteractive();
           this.modoArc.setText('Arcade');
           this.modoArc.setPosition(game.renderer.width/2, 500);
  
           //Interaccion modos de juego:
           this.flechita = this.add.image(320, 500, "flechita");
  
           //FUNCIONALIDAD:
           //Animacion personaje
           this.anims.create({
               key: 'pose',
               frames: this.anims.generateFrameNumbers('player', {start: 0, end: 4}),
               frameRate: 10,
               repeat: -1
           })
  
           this.anims.create({
               key: 'pose1',
               frames: this.anims.generateFrameNumbers('icyB', {start: 0, end: 4}),
               frameRate: 10,
               repeat: -1
           })
           //Interaccion nombres:
           //Jugador1:
           player1T.on("pointerover", ()=>{
               document.body.style.cursor = "text";
           })
           player1T.on("pointerout", ()=>{
               document.body.style.cursor = "auto";
           })
           player1T.on("pointerdown", () =>{
               player1T.setText(' ');
               var n = prompt('Introduce nombre: ', 'Player1');
               console.log(n)
               if(n == null) player1T.setText('Player1');
               else player1T.setText(n);
           })
           player1T.on("pointerup", ()=>{
               document.body.style.cursor = "auto";
           })
  
           //Jugador2
           player2T.on("pointerover", ()=>{
               document.body.style.cursor = "text";
           })
           player2T.on("pointerout", ()=>{
               document.body.style.cursor = "auto";
           })
           player2T.on("pointerdown", () =>{
               player2T.setText(' ');
               var n = prompt('Introduce nombre: ', 'Player2');
               console.log(n)
               if(n == null) player2T.setText('Player2');
               else player2T.setText(n);
           })
           player2T.on("pointerup", ()=>{
               document.body.style.cursor = "auto";
           })
  
  
           //Interaccion botones
           this.ready1 = 0;
           this.ready2 = 0;
           //ok 1:
           this.aceptar1.on("pointerover", ()=>{
               document.body.style.cursor = "pointer";
           })
           this.aceptar1.on("pointerout", ()=>{
               document.body.style.cursor = "auto";
           })
           this.aceptar1.on("pointerdown", ()=>{
               this.aceptar1.setFrame(1);
               if(player1T.text == 'Introduce tu nombre:'){
                   player1T.setText('Player1');
               }
               player1T.disableInteractive();
               this.ready1 = 1;
           })
           this.aceptar1.on("pointerup", ()=>{
               document.body.style.cursor = "auto";
           })
  
           //ok 2:
           this.aceptar2.on("pointerover", ()=>{
               document.body.style.cursor = "pointer";
           })
           this.aceptar1.on("pointerout", ()=>{
               document.body.style.cursor = "auto";
           })
           this.aceptar2.on("pointerdown", ()=>{
               this.aceptar2.setFrame(1);
               if(player2T.text == 'Introduce tu nombre:'){
                   player2T.setText('Player2');
               }
               player2T.disableInteractive();
               this.ready2 = 1;
           })
           this.aceptar2.on("pointerup", ()=>{
               document.body.style.cursor = "auto";
           })
  
           //menu:
           this.menu.on("pointerover", ()=>{
               document.body.style.cursor = "pointer";
           })
  
           this.menu.on("pointerout", ()=>{
               document.body.style.cursor = "auto";
           })
  
           this.menu.on("pointerdown", ()=>{
               this.menu.setFrame(1);
           })
  
           this.menu.on("pointerup", ()=>{
               document.body.style.cursor = "auto";
               this.scene.start("PantallaInicio");
           })
  
           //Interaccion modos de juego:
  
  
           //Entrada por teclado
           const keyCodes = Phaser.Input.Keyboard.KeyCodes;
           //Arriba
           this.teclasJ1 = this.input.keyboard.addKeys({
               w: keyCodes.W,
               a: keyCodes.A,
               d: keyCodes.D,
               s: keyCodes.S
           });
           this.teclasJ2 = this.input.keyboard.addKey(keyCodes.UP, keyCodes.LEFT, keyCodes.RIGHT, keyCodes.DOWN);
  
           if(this.teclasJ1.w.isDown){
             if(this.flechita.y > 420)
                 this.flechita.setPosition(320, this.flechita.y-40);
           }
           if(this.teclasJ1.s.isDown){
             if(this.flechita.y < 500)
                 this.flechita.setPosition(320, this.flechita.y+40);
           }
  
           //Boton play
           this.play.on("pointerover", ()=>{
               document.body.style.cursor = "pointer";
           })
  
           this.play.on("pointerout", ()=>{
               document.body.style.cursor = "auto";
           })
           this.play.on("pointerdown", ()=>{
               this.play.setFrame(1);
           })
           this.play.on('pointerup', ()=>{
               if(this.flechita.y == 500) this.scene.start('mainGame');
               else this.play.setFrame(0);
           })
  
       },
       update: function(time, delta){
           //Animacion personajes en pausa
           this.player1.anims.play('pose', true);
           this.player2.anims.play('pose1', true);
  
           //Modos juego
           if(this.flechita.y == 420) this.modoCamp.setFontSize(22);
           if(this.flechita.y != 420) this.modoCamp.setFontSize(20);
  
           if(this.flechita.y == 460) this.modoVersus.setFontSize(22);
           if(this.flechita.y != 460) this.modoVersus.setFontSize(20);
  
           if(this.flechita.y == 500) this.modoArc.setFontSize(22);
           if(this.flechita.y != 500) this.modoArc.setFontSize(20);
  
  
           //Cambiar de pantalla:
           if(this.ready1 + this.ready2 == 2)
           {
               this.ready = 0;
               console.log('aparece');
               this.play.setVisible(true);;
           }
  
       }
  })