var PantallaInicio = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

  function PantallaInicio() {
    Phaser.Scene.call(this, {key: 'PantallaInicio'});
  },

  preload: function(){
      this.load.image("sky", "assets/sky.png");
      this.load.image("logo", "assets/logo/LogoI-Scream.png");
      this.load.spritesheet('BotonPlay',
          'assets/interfaz/BotonPlay.png',
          { frameWidth: 120, frameHeight: 47 }
      );
  },
  create: function(){
      //this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "star");
      this.add.image(400, 300, "sky");
      //this.add.image(400, 300, "bg");
             this.logo = this.add.image(150, 50, "logo").setOrigin(0);
             this.playButton = this.add.sprite(380, 350, "BotonPlay").setInteractive();
             this.playButton.scale = 3;

             //Interaccion botones
             this.playButton.on("pointerover", ()=>{
                 document.body.style.cursor = "pointer";
                 this.playButton.setFrame(1);
             })

             this.playButton.on("pointerout", ()=>{
                 document.body.style.cursor = "auto";
                 this.playButton.setFrame(0);
             })

             this.playButton.on("pointerdown", ()=>{
                 this.playButton.setFrame(2);
             })

             this.playButton.on("pointerup", ()=>{
                 document.body.style.cursor = "auto";
                 this.scene.start("chSelect");
             })  },

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
       let loadingBar = this.add.graphics({
           fillStyle: {
               color: 0xffffff //color barra de cargar (CAMBIAR)
           }
       })

       this.load.on("progress", (percent)=>{
           loadingBar.fillRect(0, this.height/2, this.width*percent, 50);
           console.log(percent);
       })

       this.load.on("complete", ()=>{
           console.log('done');
       })

       //Menu de Inicio
       this.load.image("bg", "assets/background.jpg");
       this.load.image("logo", "assets/logo/LogoI-Scream.png");
       this.load.spritesheet('BotonPlay',
           'assets/BotonPlay.png',
           { frameWidth: 64, frameHeight: 64 }
       );


       //Pantalla seleccion personaje
       //Personaje:
       this.load.spritesheet('player',
           'assets/icy.png',
           { frameWidth: 64, frameHeight: 64 }
       );
       //Recuadro personaje
       this.load.image("cuadro", "assets/interfaz/eleccionPersonaje.png");

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

       //Escenario:
       this.load.spritesheet('pause',
           'assets/interfaz/botonPause.png',
           { frameWidth: 80, frameHeight: 47 }
       );


  },

  create: function(){
      this.scene.start('PantallaInicio'); //esta linea para visualizar directamente Menu Ppal
  }
});

var CharacterSelect = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

  function CharacterSelect(){
    Phaser.Scene.call(this, {key: 'chSelect'});
  },

  preload: function(){
    this.load.image("sky", "assets/sky.png");
    this.load.spritesheet("player",
        'assets/icy.png',
        { frameWidth: 64, frameHeight: 64 }
    );

  },

  create: function(){
    //CREACION ESCENA:
  //Fondo:
  this.add.image(400, 300, "sky");

  //Recuadro personaje
  this.rec = this.add.image(400, 150, "cuadro");
  this.rec.scale = 3.5;

  //Personaje
  this.player = this.add.sprite(400, 150, "player").setInteractive();
  this.player.setFrame(3);
  this.player.scale = 3;

  //Nombre jugador:
  this.player1 = this.add.text(270, 260, 'Introduce tu nombre', {
      color: '#000000',
      fontSize: 30,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: 'Bell MT',
      padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
      }
  }).setInteractive();

  //Boton aceptar: siguiente pantalla
  this.aceptar = this.add.sprite(400, 320, "aceptar").setInteractive();

  //Boton menu: volver al menu
  this.menu = this.add.sprite(710, 530, "menu").setInteractive();

  //Modo de juego:
  this.add.text(270, 370, 'MODO DE JUEGO', {
      color: '#000000',
      fontSize: 30,
      fontFamily: 'Bell MT'
  });

  this.modoCamp = this.add.text(340, 410, 'Campaña', {
      color: '#454546',
      fontSize: 30,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: 'Bell MT',
      fontStyle: 'italic'
  }).setInteractive();

  this.modoVersus = this.add.text(360, 450, 'Versus', {
      color: '#454546',
      fontSize: 30,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: 'Bell MT',
      fontStyle: 'italic'
  }).setInteractive();

  this.modoArcade = this.add.text(355, 490, 'Arcade', {
      color: '#000000',
      fontSize: 30,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: 'Bell MT',
      fontStyle: 'italic'
  }).setInteractive();

  //FUNCIONALIDAD:
  //Animacion personaje
  this.anims.create({
      key: 'pose',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 4}),
      frameRate: 10,
      repeat: -1
  })

  //Interaccion texto:
  //Interaccion botones
  this.player1.on("pointerover", ()=>{
      document.body.style.cursor = "text";
  })

  this.player1.on("pointerout", ()=>{
      document.body.style.cursor = "auto";
  })

  this.player1.on("pointerdown", () =>{
      console.log("Cambiar nombre")
      this.player1.setText(' ');
      var n = prompt('Introduce nombre: ', 'Player1');
      console.log(n)
      if(n == null) this.player1.setText('Player1');
      else this.player1.setText(n);
      this.player1.setPosition(350, 260);
  })

  this.player1.on("pointerup", ()=>{
      document.body.style.cursor = "auto";
  })


  //Interaccion botones
  //ok:
  this.aceptar.on("pointerover", ()=>{
      document.body.style.cursor = "pointer";
  })

  this.aceptar.on("pointerout", ()=>{
      document.body.style.cursor = "auto";
  })

  this.aceptar.on("pointerdown", ()=>{
      this.aceptar.setFrame(1);
  })

  this.aceptar.on("pointerup", ()=>{
      document.body.style.cursor = "auto";
      this.scene.start("mainGame");
  })
  //menu:
  //Interaccion botones
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

  /*
  const keys = Phaser.Input.Keyboard.KeyCodes;
  this.keyEnter = this.input.keyboard.addKeyy(keys.ENTER);
  this.keyEnter.on('down', () =>{
      console.log('Has pulsado enter');
  })
  */


 },

 update: function() {
   this.player.anims.play('pose', true);

    this.player1.on("pointerdown", () =>{
        console.log("Cambiar nombre")
        //this.player1.setText(' ');
        //this.nombreJugador(this.player1);
    })

    this.player1.on("pointerout", () =>{
        console.log("Saliendo del boton")
    })
 }
})
