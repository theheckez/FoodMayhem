//const Phaser = require("phaser");


var PantallaCarga = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function PantallaCarga() {
            Phaser.Scene.call(this, { key: 'PantallaCarga' });
        },

    preload: function () {
        this.load.image("empresa", 'Assets/Logos/BakeryStudiosLogo.png');

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xde72ca
            }
        })
        this.load.image('iconoJ1', 'Assets/Interfaces/InGame/purpleIceHead.png');

        //-----------------------------------------------------------------------------------
        //Escenario:
        this.load.spritesheet('pause',
            'Assets/Interfaces/Buttons/PlayPauseButtons/botonPause.png',
            { frameWidth: 80, frameHeight: 47 });
        //------------------------------------------------------------------------------------

        //Barra carga:
        this.load.on("progress", (percent) => {
            this.time.delayedCall(1000, () => {
                loadingBar.fillRect(100, 350, 600 * percent, 40);
                console.log(percent);
            });
        })

        this.load.on("complete", () => {
            console.log('done');
        })
    },

    create: function () {
        this.add.image(400, 250, 'empresa');
        this.helado = this.add.image(100, 370, 'iconoJ1');
        this.helado.setScale(1.3);

        this.time.delayedCall(2000, () => {
            this.scene.start('PantallaInicio');
        });
    }
});

var PantallaInicio = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function PantallaInicio() {
            Phaser.Scene.call(this, { key: 'PantallaInicio' });
        },


    preload: function () {
        this.load.image("logo", "Assets/Logos/logo.png");
        this.load.spritesheet('BotonPlay',
            'Assets/Interfaces/Buttons/PlayPauseButtons/playButton.png',
            { frameWidth: 64, frameHeight: 47 });
        this.load.image('marco', "Assets/Interfaces/Buttons/buttonHighlight.png");
        this.load.image("bg", "Assets/Interfaces/Scenes/initialScene.png");
        this.load.image("login", "Assets/Interfaces/InGame/Backgrounds/pestañaAviso.png");
        this.load.image("flechita", "Assets/Interfaces/Buttons/buttonMarker.png");
        this.load.image("marcador", "Assets/Interfaces/Buttons/buttonHighlight.png");
        this.load.image("local", "Assets/Interfaces/Text/local.png");
        this.load.image("online", "Assets/Interfaces/Text/online.png");
        this.load.image("credits", "Assets/Interfaces/Text/credits.png");
    },

    create: function () {
        
        //login
        //var element = document.getElementById("input-form");
        var mode;

        let text = this.add.text(350, 650, '', {
            fontFamily: 'tilesFont',
            font: (20).toString() + "px tilesFont",
            color: 'black'
        }).setScale(2);


        //this.responseText = this.add.sprite(650, 550, 'BotonPlay', 0).setOrigin(0, 0);
        //this.responseText.setVisible(false);
        let change = false; // boolean to change scene (at first is set to false)
        var responseText = this.responseText;
        var data = this.dataObj;
        //this.startButton = this.add.sprite(955, 950, 'BotonPlay');

        //this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "star");
        this.add.image(400, 300, "bg");
        this.logo = this.add.image(game.renderer.width / 2, 100, "logo").setOriginFromFrame('center');
        this.logo.setScale(1.2);

        this.login = this.add.image(game.renderer.width / 2, 310, "login").setScale(0.5);
        this.modoLocal = this.add.image(game.renderer.width / 2 - 100, 450, "local").setInteractive();
        this.modoLocal.setScale(0.8);
        //this.modoCamp.setAlpha(0.5);

        this.modoOnline = this.add.image(game.renderer.width / 2 + 100,  450, "online").setInteractive();
        this.modoOnline.setScale(0.8);

        this.modoCredits = this.add.image(game.renderer.width - 100, 550, "credits").setInteractive();
        this.modoCredits.setScale(0.7);

        //Interaccion modos de juego:
        this.flechita = this.add.image(300, 360, "flechita").setVisible(false);
        this.marcador = this.add.image(game.renderer.width / 2, 500, "marcador").setVisible(false);
        this.marcador.setScale(2);

        //***LOGIN***//
        let name = document.getElementById("namebar");
        name.style.visibility = "visible";
        let passwordo = document.getElementById("password");
        passwordo.style.top = '390px';
        passwordo.style.visibility = "visible";
        
        this.url = window.location.href;

        
        this.playButton = this.add.sprite(game.renderer.width / 2, 520, "BotonPlay").setInteractive();
        this.playButton.setScale(2);

        //Interaccion botones
        //Modo Local
        this.modoLocal.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.modoLocal.setScale(1);
            this.flechita.setPosition(this.modoLocal.x - 100, this.modoLocal.y,);
            this.flechita.setVisible(true);
        })

        this.modoLocal.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.modoLocal.setScale(0.8);
            this.flechita.setVisible(false);
        })

        this.modoLocal.on("pointerdown", () => {
            //this.playButton.setFrame(1);
            this.modoLocal.setAlpha(0.8);
            this.modoOnline.setAlpha(1);
        })

        this.modoLocal.on("pointerup", () => {
            document.body.style.cursor = "auto";
            //this.scene.start("chSelect");
            mode = "Local"
        })
        //Modo Online
        this.modoOnline.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.modoOnline.setScale(1);
            this.flechita.setPosition(this.modoOnline.x - 100, this.modoOnline.y);
            this.flechita.setVisible(true);
        })

        this.modoOnline.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.modoOnline.setScale(0.8);
            this.flechita.setVisible(false);
        })

        this.modoOnline.on("pointerdown", () => {
            //this.playButton.setFrame(1);
            //this.marco.setVisible(false);
            this.modoOnline.setAlpha(0.8);
            this.modoLocal.setAlpha(1);
        })

        this.modoOnline.on("pointerup", () => {
            document.body.style.cursor = "auto";
            mode = "Online";
            //this.scene.start("chSelect");
        })
        //Creditos
        this.modoCredits.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.modoCredits.setScale(1);
            this.flechita.setPosition(this.modoCredits.x - 150, this.modoCredits.y);
            this.flechita.setVisible(true);
        })

        this.modoCredits.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.modoCredits.setScale(0.8);
            this.flechita.setVisible(false);
        })

        this.modoCredits.on("pointerdown", () => {
            //this.playButton.setFrame(1);
            //this.marco.setVisible(false);
            this.modoCredits.setAlpha(0.8);
        })

        this.modoCredits.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("PantallaCreditos");
        })

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
            name.style.visibility = "hidden";
            passwordo.style.visibility = "hidden";
            document.body.style.cursor = "auto";
            if (name.value != "" && passwordo.value != "") {
               
                console.log(this.url);
                console.log(name.value);
                console.log(passwordo.value)
                $.ajax({
                    type: "POST",
                    async: false,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: this.url + "users",
                    data: JSON.stringify({nick: "" + name.value, password: "" + passwordo.value }),
                    dataType: "json",
                    success: function (boolean) { // returned variable to check if we can change the scene
                        change = boolean;
                    }
                }).done(function (item) {
                    console.log("User created: " + JSON.stringify({ nickname: "" + name.value, pass: "" + passwordo.value}));
                    
                })

                // Starts the next scene
                if (change) { //Si el usuario y contraseña existen y estan bien o no existen, se crea uno nuevo y se inicia la escena
                    //this.responseText.setFrame(0);
                    //this.responseText.setVisible(true);
                    //this.scene.stop();
                    //this.dataObj.username = this.name.value;
                    //this.dataObj.url = this.url;
                    //this.time.addEvent({ delay: 1000, callback: countdownFunction, callbackScope: this, loop: true });
                    //this.scene.start('lobby', data);
                    this.scene.start("chSelect");
                } else { // Si existe el usuario introducido pero la contraseña no es la guardada en el servidor, le decimos que intente de nuevo
                    //this.responseText.setFrame(2);
                    //this.responseText.setVisible(true);
                    console.log(name);
                    console.log(passwordo)
                    console.log("Nope");
                    //text.setText('Contraseña incorrecta. Inténtelo de nuevo'); //
                }
            }
        })
    },
});

var PantallaCreditos = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function PantallaCreditos() {
            Phaser.Scene.call(this, { key: 'PantallaCreditos' });
        },

    preload: function () {
        this.load.image("creditos", "Assets/Interfaces/Scenes/pantallaCredits.png");
    },
    create: function () {
        this.add.image(400, 300, "creditos");
    }
});

var TwoCharacterSelect = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function CharacterSelect() {
            Phaser.Scene.call(this, { key: 'chSelect' });
        },

    preload: function () {
        //Background
        this.load.image("bg2", "Assets/Interfaces/Scenes/charSelectScene.png");
        //Personajes:
        this.load.spritesheet('player',
            'Assets/Characters/SpritesheetJugadores/SpritesheetP1/icy.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player2',
            'Assets/Characters/SpritesheetJugadores/SpritesheetP2/Yci.png',
            { frameWidth: 64, frameHeight: 64 });
        //Recuadro
        this.load.image("cuadro", "Assets/Interfaces/InGame/Backgrounds/eleccionPersonaje.png");
        //Cargar letras:
        this.add.text(0, 0, '', { fontFamily: 'estilo' });
        this.add.text(0, 0, '', { fontFamily: 'titulo' });
        this.add.text(0, 0, '', { fontFamily: 'damage' });
        //Aceptar
        this.load.spritesheet('aceptar',
            'Assets/Interfaces/Buttons/ConfirmButtons/okButton.png',
            { frameWidth: 120, frameHeight: 47 });
        //Menu
        this.load.spritesheet('menu',
            'Assets/Interfaces/Buttons/MenuButton/menuButton.png',
            { frameWidth: 120, frameHeight: 47 });
        //Play
        this.load.spritesheet('play',
            'Assets/Interfaces/Buttons/PlayPauseButtons/playbutton.png',
            { frameWidth: 120, frameHeight: 47 });

        //Flecha modo juego
        this.load.image("flechita", "Assets/Interfaces/Buttons/buttonMarker.png");
    },

    create: function(){
        openConnection();
        characterSelectScene = this;

        //CREACION ESCENA:
        //Fondo:
        this.add.image(400, 300, 'bg2');

        //Recuadro personaje 1
        this.rec = this.add.image(210, 200, "cuadro");
        this.rec.setScale(3.5);
        //Recuadro personaje 2
        this.rec2 = this.add.image(590, 200, "cuadro");
        this.rec2.setScale(3.5);

        //Personaje 1
        this.player1 = this.add.sprite(210, 200, 'player').setInteractive();
        this.player1.setFrame(3);
        this.player1.setScale(3);
        //Personaje 2
        this.player2 = this.add.sprite(590, 200, 'player2').setInteractive();
        this.player2.setFrame(3);
        this.player2.setScale(3);

        //***POR HACER: MOSTRAR NOMBRES JUGADORES***//

        //Botones aceptar: bloquean introducir nombre y van a siguiente pantalla
        this.aceptar1 = this.add.sprite(210, 350, "aceptar").setInteractive();
        this.marco1 = this.add.image(210, 350, 'marco').setVisible(false);
        this.marco1.setScale(1.2);

        this.aceptar2 = this.add.sprite(590, 350, "aceptar").setInteractive();
        this.marco2 = this.add.image(590, 350, 'marco').setVisible(false);
        this.marco2.setScale(1.2);

        //Boton menu: volver al menu
        this.menu = this.add.sprite(100, 69, "menu").setInteractive();
        this.marcoMenu = this.add.image(100, 69, 'marco').setVisible(false);

        //Boton play
        this.play = this.add.sprite(695, 480, "play").setInteractive();
        this.play.setVisible(false);
        this.marcoPlay = this.add.image(695, 480, 'marco').setVisible(false);

        //***CHAT***//
        let chatArea = document.getElementById("chat");
        chatArea.style.visibility = "visible";
        let textInput = document.getElementById("inputChat");
        textInput.style.visibility = "visible";
        //let sendButton = document.getElementById("sendButton");
        //sendButton.style.visibility = "visible";

        //FUNCIONALIDAD:
        //Animacion personajes
        this.anims.create({
            key: 'pose',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'pose2',
            frames: this.anims.generateFrameNumbers('player2', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })

        //Interaccion botones
        this.ready1 = 0;
        this.ready2 = 0;
        //ok 1:
        this.aceptar1.on("pointerover", () => {
            if (this.ready1 != 1) {
                document.body.style.cursor = "pointer";
                this.marco1.setVisible(true);
            }
        })
        this.aceptar1.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marco1.setVisible(false);
        })
        this.aceptar1.on("pointerdown", () => {
            this.marco1.setVisible(false);
            this.aceptar1.setFrame(1);
            player1T = document.getElementById("namebar");
            if (player1T.value == "") document.getElementById("namebar").value = "Player1";
            this.ready1 = 1;
            console.log("Player1:" + player1T.value);
            this.aceptar1.disableInteractive();
            player1T.disabled = true;
        })
        this.aceptar1.on("pointerup", () => {
            document.body.style.cursor = "auto";
        })

        //ok 2:
        this.aceptar2.on("pointerover", () => {
            if (this.ready2 != 1) {
                document.body.style.cursor = "pointer";
                this.marco2.setVisible(true);
            }
        })
        this.aceptar2.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marco2.setVisible(false);
        })
        this.aceptar2.on("pointerdown", () => {
            this.marco2.setVisible(false);
            this.aceptar2.setFrame(1);
           // player2T = document.getElementById("namebar2");
            //if (player2T.value == "") document.getElementById("namebar2").value = "Player2";
            this.ready2 = 1;
           // console.log("Player2:" + player2T.value);
            this.aceptar2.disableInteractive();
            //player2T.disabled = true;
        })
        this.aceptar2.on("pointerup", () => {
            document.body.style.cursor = "auto";
        })

        //menu:
        this.menu.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoMenu.setVisible(true);
        })
        this.menu.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerdown", () => {
            this.marcoMenu.setVisible(false);
            this.menu.setFrame(1);
        })
        this.menu.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("PantallaInicio");
        })

        //Boton play
        this.play.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoPlay.setVisible(true);
        })
        this.play.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoPlay.setVisible(false);
        })
        this.play.on("pointerdown", () => {
            this.marcoPlay.setVisible(false);
            this.play.setFrame(1);
        })
        this.play.on('pointerup', () => {

            connectionWebSocket.sendWS("play");
            //this.scene.start('mainGame');
            this.play.setFrame(0);
            player1T.style.visibility = "hidden";
           // player2T.style.visibility = "hidden";
        })

        //CHAT
        //sendButton.onclick(() => {

        //})

        
    },

    update: function (time, delta) {
        //Animacion personajes en pausa
        this.player1.anims.play('pose', true);
        this.player2.anims.play('pose2', true);

        //Cambiar de pantalla:
        if (this.ready1 + this.ready2 == 2) {
            this.ready = 0;
            this.play.setVisible(true);;
        }
        /*

        if(this.teclasJ1.w.JustDown == true){
            if(this.flechita.y > 420)
                this.flechita.setPosition(320, this.flechita.y-40);
        }
        if(this.teclasJ1.s.isDown){
            if(this.flechita.y < 500)
                this.flechita.setPosition(320, this.flechita.y+40);
        }

        if(this.teclasJ2.up.isDown){
            if(this.flechita.y > 420)
                this.flechita.setPosition(320, this.flechita.y-40);
        }
        if(this.teclasJ2.down.isDown){
            if(this.flechita.y < 500)
                this.flechita.setPosition(320, this.flechita.y+40);
        }*/
    }
});

var OneCharacterSelect = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function CharacterSelect() {
            Phaser.Scene.call(this, { key: 'chSelect' });
        },

    preload: function () {
        //Background
        this.load.image("bg2", "Assets/Interfaces/Scenes/charSelectScene.png");
        //Personajes:
        this.load.spritesheet('player',
            'Assets/Characters/SpritesheetJugadores/SpritesheetP1/icy.png',
            { frameWidth: 64, frameHeight: 64 });
        //Recuadro
        this.load.image("cuadro", "Assets/Interfaces/InGame/Backgrounds/eleccionPersonaje.png");
        //Cargar letras:
        this.add.text(0, 0, '', { fontFamily: 'estilo' });
        this.add.text(0, 0, '', { fontFamily: 'titulo' });
        this.add.text(0, 0, '', { fontFamily: 'damage' });
        //Aceptar
        this.load.spritesheet('aceptar',
            'Assets/Interfaces/Buttons/ConfirmButtons/okButton.png',
            { frameWidth: 120, frameHeight: 47 });
        //Menu
        this.load.spritesheet('menu',
            'Assets/Interfaces/Buttons/MenuButton/menuButton.png',
            { frameWidth: 120, frameHeight: 47 });
        //Play
        this.load.spritesheet('play',
            'Assets/Interfaces/Buttons/PlayPauseButtons/playbutton.png',
            { frameWidth: 120, frameHeight: 47 });

        //Flecha modo juego
        this.load.image("flechita", "Assets/Interfaces/Buttons/buttonMarker.png");
    },

    create: function () {
        //CREACION ESCENA:
        //Fondo:
        this.add.image(400, 300, 'bg2');

        //Recuadro personaje 1
        this.rec = this.add.image(400, 200, "cuadro");
        this.rec.setScale(3.5);

        //Personaje 1
        this.player1 = this.add.sprite(400, 200, 'player').setInteractive();
        this.player1.setFrame(3);
        this.player1.setScale(3);

        /*
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
        }*/
        document.getElementById("namebar").style.visibility = "visible";
        document.getElementById("namebar").style.marginLeft = '-130px';
        /*
        //Nombre jugador 1:
        player1T = this.make.text(configNombres).setInteractive();
        //Nombre jugador 2:
        player2T = this.make.text(configNombres).setInteractive();
        player2T.setPosition(590, 290);
        */
        //Botones aceptar: bloquean introducir nombre y van a siguiente pantalla
        this.aceptar1 = this.add.sprite(400, 360, "aceptar").setInteractive();
        this.marco1 = this.add.image(400, 360, 'marco').setVisible(false);
        this.marco1.setScale(1.2);
        /*
        this.aceptar2 = this.add.sprite(590, 330, "aceptar").setInteractive();
        this.marco2 = this.add.image(590, 330, 'marco').setVisible(false);
        this.marco2.setScale(1.2);
        */
        //Recuadro Modo juego
        /*
        let recuadroMJ = this.add.graphics({
            fillStyle: {
                color: 0xa87bc7,
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
        */
        //Boton menu: volver al menu
        this.menu = this.add.sprite(695, 525, "menu").setInteractive();
        this.marcoMenu = this.add.image(695, 525, 'marco').setVisible(false);

        //Boton play
        this.play = this.add.sprite(695, 480, "play").setInteractive();
        this.play.setVisible(false);
        this.marcoPlay = this.add.image(695, 480, 'marco').setVisible(false);

        /*
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
        this.modoCamp.setText('Campaña');
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
        */
        //FUNCIONALIDAD:
        //Animacion personajes
        this.anims.create({
            key: 'pose',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        /*
        this.anims.create({
            key: 'pose2',
            frames: this.anims.generateFrameNumbers('player2', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        })*/

        /*
        player1T.on("pointerover", ()=>{
            document.body.style.cursor = "text";
        })
        player1T.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
        })
        player1T.on("pointerdown", () =>{
            //player1T.setText(' ');
            //document.getElementById('namebar').setVisible;
            introduceName(player1T);
            //var n = prompt('Introduce nombre: ', 'Player1');
            //console.log(n)
            //if(n == null) player1T.setText('Player1');
            //else player1T.setText(n);
        })
        player1T.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
        })*/

        //Interaccion botones
        this.ready1 = 0;
        //ok:
        this.aceptar1.on("pointerover", () => {
            if (this.ready1 != 1) {
                document.body.style.cursor = "pointer";
                this.marco1.setVisible(true);
            }
        })
        this.aceptar1.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marco1.setVisible(false);
        })
        this.aceptar1.on("pointerdown", () => {
            this.marco1.setVisible(false);
            this.aceptar1.setFrame(1);
            player1T = document.getElementById("namebar");
            if (player1T.value == null) document.getElementById("namebar").value = "Player";
            console.log("Player:" + player1T.value);
            this.aceptar1.disableInteractive();
            player1T.disabled = true;
            this.ready1 = 1;
        })
        this.aceptar1.on("pointerup", () => {
            document.body.style.cursor = "auto";
        })

        //menu:
        this.menu.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoMenu.setVisible(true);
        })
        this.menu.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerdown", () => {
            this.marcoMenu.setVisible(false);
            this.menu.setFrame(1);
        })
        this.menu.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("PantallaInicio");
        })

        //Interaccion modos de juego:
        //Entrada por teclado
        /*
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.teclasJ1 = this.input.keyboard.addKeys({
            w: keyCodes.W,
            a: keyCodes.A,
            d: keyCodes.D,
            s: keyCodes.S
        });
        this.teclasJ2 = this.input.keyboard.addKeys({
            up: keyCodes.UP, 
            left: keyCodes.LEFT, 
            right: keyCodes.RIGHT, 
            down: keyCodes.DOWN
        });*/
        /*
        this.teclasJ1.w.on('down', () =>{
            if(this.flechita.y > 420)
                this.flechita.setPosition(320, this.flechita.y-40);
        })
        this.teclasJ1.s.on('down', () =>{
            if(this.flechita.y < 500)
                this.flechita.setPosition(320, this.flechita.y+40);
        })

        this.teclasJ2.up.on('down', () =>{
            if(this.flechita.y > 420)
                this.flechita.setPosition(320, this.flechita.y-40);
        })
        this.teclasJ2.down.on('down', () =>{
            if(this.flechita.y < 500)
                this.flechita.setPosition(320, this.flechita.y+40);
        })
        */

        //Boton play
        this.play.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoPlay.setVisible(true);
        })
        this.play.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoPlay.setVisible(false);
        })
        this.play.on("pointerdown", () => {
            this.marcoPlay.setVisible(false);
            this.play.setFrame(1);
        })
        this.play.on('pointerup', () => {
            this.scene.start('mainGame');
            this.play.setFrame(0);
            player1T.style.visibility = "hidden";
            player2T.style.visibility = "hidden";
        })

        //Modos juego
        /*
        if(this.flechita.y == 420) this.modoCamp.setFontSize(22);
        if(this.flechita.y != 420) this.modoCamp.setFontSize(20);
  
        if(this.flechita.y == 460) this.modoVersus.setFontSize(22);
        if(this.flechita.y != 460) this.modoVersus.setFontSize(20);
  
        if(this.flechita.y == 500) this.modoArc.setFontSize(22);
        if(this.flechita.y != 500) this.modoArc.setFontSize(20);*/
    },

    update: function (time, delta) {
        //Animacion personajes en pausa
        this.player1.anims.play('pose', true);

        //Cambiar de pantalla:
        if (this.ready1 == 1) {
            this.ready = 0;
            this.play.setVisible(true);
        }
        /*

        if(this.teclasJ1.w.JustDown == true){
            if(this.flechita.y > 420)
                this.flechita.setPosition(320, this.flechita.y-40);
        }
        if(this.teclasJ1.s.isDown){
            if(this.flechita.y < 500)
                this.flechita.setPosition(320, this.flechita.y+40);
        }

        if(this.teclasJ2.up.isDown){
            if(this.flechita.y > 420)
                this.flechita.setPosition(320, this.flechita.y-40);
        }
        if(this.teclasJ2.down.isDown){
            if(this.flechita.y < 500)
                this.flechita.setPosition(320, this.flechita.y+40);
        }*/
    }
});


class PantallaPausa extends Phaser.Scene {
    constructor() {
        super({ key: 'PantallaPausa' });
    }
    preload() {
        //Background:
        this.load.image("stop", "Assets/Interfaces/Scenes/pauseScene.png");
        //Botones
        //x
        this.load.spritesheet('exit',
            'Assets/Interfaces/Buttons/ConfirmButtons/closeButton.png',
            { frameWidth: 80, frameHeight: 47 });

        //Iconos:
        this.load.image('iconoJ1', 'Assets/Interfaces/InGame/purpleIceHead.png');
        this.load.image('iconoJ2', 'Assets/Interfaces/InGame/blueIceHead.png');

        //Variables
        //Barra vida:
        this.load.image('vidaJ1', 'Assets/Interfaces/InGame/LifeBars/barraVidaP1.png');
        this.load.image('vidaJ2', 'Assets/Interfaces/InGame/LifeBars/barraVidaP2.png');

        //Pestaña aviso
        this.load.image('aviso', 'Assets/Interfaces/InGame/Backgrounds/pestañaAviso.png');

        this.load.spritesheet('yes', 'Assets/Interfaces/Buttons/ConfirmButtons/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('no', 'Assets/Interfaces/Buttons/ConfirmButtons/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

    }
    create() {
        //CREACION ESCENA
        //Background
        this.add.image(400, 300, "stop");

        //Titulo PAUSA
        //Modo de juego:
        const confTitulo = {
            origin: 'center',
            x: game.renderer.width / 2,
            y: 100,
            text: 'PAUSE',
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
        this.exit.setScale(0.8);
        //menu
        this.menu = this.add.sprite(400, 500, "menu").setInteractive();
        this.marcoMenu = this.add.image(400, 500, 'marco').setVisible(false);
        this.marcoMenu.setScale("1.4");

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
        this.make.text(confJugadores).setText(player1T.text);
        this.make.text(confJugadores).setText(player2T.text).setPosition(game.renderer.width * 3 / 4, 180);

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
        if (player1.health == 100) {
            vidaJ1.fillRect(214, 267, 132, 10);
        } else if (player1.health < 100 && player1.health > 0) {
            vidaJ1.fillRect(214, 267, (132 / 100) * player1.health, 10);
        } else if (player1.health <= 0) {
            vidaJ1.fillRect(214, 267, 0, 10);
        }
        //Vida Jugador 2:
        if (player2.health == 100) {
            vidaJ1.fillRect(657, 267, -132, 10);
        } else if (player2.health < 100 && player1.health > 0) {
            vidaJ1.fillRect(657, 267, -(132 / 100) * player2.health, 10);
        } else if (player2.health <= 0) {
            vidaJ1.fillRect(657, 267, 0, 10);
        }

        //Daño de ataque
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
        this.make.text(confDamage).setText('x' + player1.attackHitbox.attackDmg);
        this.make.text(confDamage).setText('x' + player2.attackHitbox.attackDmg).setPosition(610, 350);

        //Mensaje abandonar partida
        //tapar fondo
        this.niebla = this.add.graphics({
            fillStyle: {
                color: 0x828282, //color barra de cargar (CAMBIAR)
                alpha: 0.4,
            }
        })
        this.niebla.fillRect(0, 0, 800, 600).setVisible(false);
        this.pestaña = this.add.image(400, 300, 'aviso').setVisible(false);
        this.abandonar = this.make.text(confVariables).setText(
            '¿Abandonar la partida?').setPosition(
                400, 230).setFontSize(25).setVisible(false);
        //warning
        //x
        this.exit2 = this.add.sprite(625, 185, "exit").setVisible(false);
        this.exit2.scale = 0.6;

        //yes y no
        this.yes = this.add.sprite(300, 350, 'yes').setVisible(false);
        this.marcoYes = this.add.image(300, 350, 'marco').setVisible(false);
        this.marcoYes.scale = 1.2;

        this.no = this.add.sprite(500, 350, 'no').setVisible(false);
        this.marcoNo = this.add.image(500, 350, 'marco').setVisible(false);
        this.marcoNo.scale = 1.2;

        //FUNCIONALIDADES
        //exit
        this.exit.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.exit.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.exit.on("pointerdown", () => {
            this.exit.setFrame(1);
        })
        this.exit.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.wake("mainGame");
            sceneChangeWebSocket.sendWS('mainGame');
            this.scene.sleep();
        })
        //menu
        this.menu.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoMenu.setVisible(true);
        })
        this.menu.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerdown", () => {
            this.menu.setFrame(1);
            this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerup", () => {
            this.menu.setFrame(0);
            document.body.style.cursor = "auto";
            this.niebla.setVisible(true);
            this.pestaña.setVisible(true);
            this.abandonar.setVisible(true);
            this.exit2.setVisible(true).setInteractive();
            this.yes.setVisible(true).setInteractive();
            this.no.setVisible(true).setInteractive();
            this.menu.disableInteractive();
            this.exit.disableInteractive();
        })
        //exit2
        this.exit2.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.exit2.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.exit2.on("pointerdown", () => {
            this.exit2.setFrame(1);
        })
        this.exit2.on("pointerup", () => {
            this.exit2.setFrame(0);
            document.body.style.cursor = "auto";
            this.niebla.setVisible(false);
            this.pestaña.setVisible(false);
            this.abandonar.setVisible(false);
            this.exit2.setVisible(false).disableInteractive();
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.menu.setInteractive();
            this.exit.setInteractive();
        })
        //yes
        this.yes.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoYes.setVisible(true);
        })
        this.yes.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoYes.setVisible(false);
        })
        this.yes.on("pointerdown", () => {
            this.yes.setFrame(1);
            this.marcoYes.setVisible(false);
        })
        this.yes.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("PantallaInicio");
        })
        //no
        this.no.on("pointerover", () => {
            document.body.style.cursor = "pointer";
            this.marcoNo.setVisible(true);
        })
        this.no.on("pointerout", () => {
            document.body.style.cursor = "auto";
            this.marcoNo.setVisible(false);
        })
        this.no.on("pointerdown", () => {
            this.no.setFrame(1);
            this.marcoNo.setVisible(false);
        })
        this.no.on("pointerup", () => {
            this.no.setFrame(0);
            document.body.style.cursor = "auto";
            this.niebla.setVisible(false);
            this.pestaña.setVisible(false);
            this.abandonar.setVisible(false);
            this.exit2.setVisible(false).disableInteractive();
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.menu.setInteractive();
            this.exit.setInteractive();
        })

    }
};

class ResultadoDerrota extends Phaser.Scene {
    constructor() {
        super({ key: 'ResultadoDerrota' });
    }
    preload() {
        this.load.image("escenario", 'Assets/Interfaces/Scenes/pauseScene.png');
        this.load.image('derrota', 'Assets/Interfaces/Scenes/pantallaDefeat.png');

        //Iconos:
        this.load.image('iconoJ1', 'Assets/Interfaces/InGame/cabezaMorada.png');
        this.load.image('iconoJ2', 'Assets/Interfaces/InGame/cabezaAzul.png');

        //Pestaña aviso
        this.load.image('aviso', 'Assets/Interfaces/Backgrounds/pestañaAviso.png');

        this.load.spritesheet('yes', 'Assets/Interfaces/Buttons/ConfirmButtons/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('no', 'Assets/Interfaces/Buttons/ConfirmButtons/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

        //x
        this.load.spritesheet('exit',
            'Assets/Interfaces/Buttons/ConfirmButtons/closeButton.png',
            { frameWidth: 80, frameHeight: 47 }
        );
    }
    create() {
        //CREACION ESCENARIO
        //Escenario
        this.add.image(400, 300, 'escenario');
        //Filtro
        let filtro = this.add.graphics({
            fillStyle: {
                color: 0x5b2970, //color barra de cargar (CAMBIAR)
                alpha: 0.2,
            }
        })
        filtro.fillRect(0, 0, 800, 600);
        //Derrota
        this.add.image(400, 300, 'derrota').setScale(1.1);

        //Iconos jugadores
        this.add.image(300, 240, 'iconoJ1');
        this.add.image(500, 240, 'iconoJ2');

        //Jugadores
        const confN = {
            origin: 'center',
            x: 300,
            y: 280,
            style: {
                fontFamily: 'estilo',
                color: '#ffffff',
                fontSize: 25,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.make.text(confN).setText(player1T.value);
        this.make.text(confN).setText(player2T.value).setPosition(500, 280);

        //Kills
        const confKills = {
            origin: 'center',
            x: 300,
            y: 390,
            style: {
                fontFamily: 'estilo',
                color: '#ffffff',
                fontSize: 20,
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.make.text(confKills).setText('Score');
        this.make.text(confKills).setText('Score').setPosition(500, 390);

        const confnKills = {
            origin: 'center',
            x: 300,
            y: 340,
            style: {
                fontFamily: 'titulo',
                color: '#ffffff',
                fontSize: 25,
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.make.text(confnKills).setText(player1.lifeBar.kills);
        this.make.text(confnKills).setText(player2.lifeBar.kills).setPosition(500, 340);


        //Salir
        //this.salir = this.add.sprite(400, 450, "aceptar").setInteractive();
        this.marcoOk = this.add.image(400, 450, 'marco').setVisible(false);
        this.marcoOk.scale = 1.2;

        //Pestaña confirmacion
        const confSalir = {
            origin: 'center',
            x: 240,
            y: 230,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 25,
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.pestaña = this.add.image(400, 300, 'aviso').setVisible(false);
        this.abandonar = this.make.text(confSalir).setText(
            '¿Repetir el nivel?').setPosition(
                400, 230).setFontSize(25).setVisible(false);
        this.volverInicio = this.make.text(confSalir).setText(
            'Si dices que no, \nvolverás al menú del inicio').setPosition(
                400, 278).setFontSize(16).setVisible(false);
        //warning
        //x
        //this.exit2 = this.add.sprite(625, 185, "exit").setVisible(false);
        //this.exit2.scale = 0.6;
        //yes y no
        this.yes = this.add.sprite(300, 350, 'yes').setVisible(false);
        this.no = this.add.sprite(500, 350, 'no').setVisible(false);
        /*
        //FUNCIONALIDAD
        this.salir.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.marcoOk.setVisible(true);
        })
        this.salir.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.marcoOk.setVisible(false);
        })
        this.salir.on("pointerdown", ()=>{
            this.salir.setFrame(1); 
            this.marcoOk.setVisible(false);
        })
        this.salir.on("pointerup", ()=>{
            this.salir.setFrame(0);
            document.body.style.cursor = "auto";
            this.pestaña.setVisible(true);
            this.abandonar.setVisible(true);
            this.volverInicio.setVisible(true);
            this.exit2.setVisible(true).setInteractive();
            this.yes.setVisible(true).setInteractive();
            this.no.setVisible(true).setInteractive();
            this.salir.disableInteractive();
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
            this.pestaña.setVisible(false);
            this.abandonar.setVisible(false);
            this.volverInicio.setVisible(false);
            this.exit2.setVisible(false).disableInteractive();
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.salir.setInteractive();
        })*/
        //yes
        this.yes.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.yes.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.yes.on("pointerdown", () => {
            this.yes.setFrame(1);
        })
        this.yes.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start('mainGame');
        })
        //no
        this.no.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.no.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.no.on("pointerdown", () => {
            this.no.setFrame(1);
        })
        this.no.on("pointerup", () => {
            this.no.setFrame(0);
            document.body.style.cursor = "auto";
            this.scene.start('PantallaInicio');
        })

        //SCORES
        this.guardarHS1 = new HighScoreClass(this);
        this.guardarHS1.checkHighScore(player1T.value, player1.lifeBar.kills);
        this.guardarHS1.checkHighScore(player2T.value, player2.lifeBar.kills);

        const next = {
            origin: 'center',
            x: 400,
            y: 540,
            text: 'Press any key to continue',
            style: {
                fontFamily: 'estilo',
                color: '#ffffff',
                fontSize: 20,
                textAlign: 'center',
                justifyContent: 'center',
                class: 'animacion'
            }
        }
        this.continue = this.make.text(next);

        document.addEventListener('keydown', () => {
            this.scene.start('HighScoresScreen');
        })


    }
    update(time, date) {

    }
}

class ResultadoVictoria extends Phaser.Scene {
    constructor() {
        super({ key: 'ResultadoVictoria' });
    }
    preload() {
        this.load.image("escenario", 'Assets/Scenaries/Map/map1.png');
        this.load.image('victoria', 'Assets/Interfaces/InGame/Backgrounds/victoryScene.png');

        //Iconos:
        this.load.image('iconoJ1', 'Assets/Interfaces/InGame/purpleIceHead.png');
        this.load.image('iconoJ2', 'Assets/Interfaces/InGame/blueIceHead.png');

        //Pestaña aviso
        this.load.image('aviso', 'Assets/Interfaces/InGame/Backgrounds/pestañaAviso.png');

        this.load.spritesheet('yes', 'Assets/Interfaces/Buttons/ConfirmButtons/confirmButton.png', { frameWidth: 120, frameHeight: 47 });
        this.load.spritesheet('no', 'Assets/Interfaces/Buttons/ConfirmButtons/cancelButton.png', { frameWidth: 120, frameHeight: 47 });

        //x
        this.load.spritesheet('exit',
            'Assets/Interfaces/Buttons/ConfirmButtons/closeButton.png',
            { frameWidth: 80, frameHeight: 47 }
        );
    }
    create() {
        //CREACION ESCENARIO
        //Escenario
        this.add.image(400, 382, 'escenario');
        //Filtro
        let filtro = this.add.graphics({
            fillStyle: {
                color: 0x5b2970, //color barra de cargar (CAMBIAR)
                alpha: 0.2,
            }
        })
        filtro.fillRect(0, 0, 800, 600);
        //Victoria
        this.add.image(400, 300, 'victoria').setScale(1.2);

        //Iconos jugadores
        this.add.image(300, 230, 'iconoJ1');
        this.add.image(500, 230, 'iconoJ2');

        //Jugadores
        const confN = {
            origin: 'center',
            x: 300,
            y: 270,
            style: {
                fontFamily: 'estilo',
                color: '#ffffff',
                fontSize: 25,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        //this.make.text(confN).setText(player1T.value);
        //this.make.text(confN).setText(player2T.value).setPosition(500, 270);

        //Kills
        const confKills = {
            origin: 'center',
            x: 300,
            y: 390,
            style: {
                fontFamily: 'estilo',
                color: '#ffffff',
                fontSize: 20,
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.make.text(confKills).setText('Score');
        this.make.text(confKills).setText('Score').setPosition(500, 390);

        const confnKills = {
            origin: 'center',
            x: 300,
            y: 340,
            style: {
                fontFamily: 'titulo',
                color: '#ffffff',
                fontSize: 25,
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        this.make.text(confnKills).setText(player1.lifeBar.kills);
        this.make.text(confnKills).setText(player2.lifeBar.kills).setPosition(500, 340);

        //Salir
        //this.salir = this.add.sprite(400, 450, "aceptar").setInteractive();
        this.marcoOk = this.add.image(400, 450, 'marco').setVisible(false);
        this.marcoOk.scale = 1.2;

        //Pestaña confirmacion
        const confSalir = {
            origin: 'center',
            x: 240,
            y: 230,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 25,
                textAlign: 'center',
                justifyContent: 'center'
            }
        }
        this.pestaña = this.add.image(400, 300, 'aviso').setVisible(false);
        this.abandonar = this.make.text(confSalir).setText(
            '¿Volver al menú principal?').setPosition(
                400, 230).setFontSize(25).setVisible(false);
        //warning
        //x

        //this.exit2 = this.add.sprite(625, 185, "exit").setVisible(false);
        //this.exit2.scale = 0.6;
        //yes y no
        this.yes = this.add.sprite(300, 350, 'yes').setVisible(false);
        this.no = this.add.sprite(500, 350, 'no').setVisible(false);

        //FUNCIONALIDAD
        /*
        this.salir.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.marcoOk.setVisible(true);
        })
        this.salir.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.marcoOk.setVisible(false);
        })
        this.salir.on("pointerdown", ()=>{
            this.salir.setFrame(1); 
            this.marcoOk.setVisible(false);
        })
        this.salir.on("pointerup", ()=>{
            this.salir.setFrame(0);
            document.body.style.cursor = "auto";
            this.pestaña.setVisible(true);
            this.abandonar.setVisible(true);
            this.exit2.setVisible(true).setInteractive();
            this.yes.setVisible(true).setInteractive();
            this.no.setVisible(true).setInteractive();
            this.salir.disableInteractive();
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
            this.pestaña.setVisible(false);
            this.abandonar.setVisible(false);
            this.exit2.setVisible(false).disableInteractive();
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.salir.setInteractive();
        })*/
        //yes
        this.yes.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.yes.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.yes.on("pointerdown", () => {
            this.yes.setFrame(1);
        })
        this.yes.on("pointerup", () => {
            document.body.style.cursor = "auto";
            this.scene.start("PantallaInicio");
        })
        //no
        this.no.on("pointerover", () => {
            document.body.style.cursor = "pointer";
        })
        this.no.on("pointerout", () => {
            document.body.style.cursor = "auto";
        })
        this.no.on("pointerdown", () => {
            this.no.setFrame(1);
        })
        this.no.on("pointerup", () => {
            this.no.setFrame(0);
            document.body.style.cursor = "auto";
            this.pestaña.setVisible(false);
            this.abandonar.setVisible(false);
            this.exit2.setVisible(false).disableInteractive();
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.salir.setInteractive();
        })

        //SCORES
        this.guardarHS1 = new HighScoreClass(this);
        //this.guardarHS1.checkHighScore(player1T.value, player1.lifeBar.kills);
       // this.guardarHS1.checkHighScore(player2T.value, player2.lifeBar.kills);

        const next = {
            origin: 'center',
            x: 400,
            y: 540,
            text: 'Press any key to continue',
            style: {
                fontFamily: 'estilo',
                color: '#ffffff',
                fontSize: 20,
                textAlign: 'center',
                justifyContent: 'center',
                class: 'animacion'
            }
        }
        this.continue = this.make.text(next);

        document.addEventListener('keydown', () => {
            this.scene.start('HighScoresScreen');
        })
    }
    update(time, date) {

    }
}



class HighScoresScreen extends Phaser.Scene {
    constructor() {
        super({ key: "HighScoresScreen" });
    }

    preload() {
        //Background
        this.load.image("highsc", "Assets/Interfaces/Scenes/highScores.png");
    }
    create() {
        this.add.image(400, 300, 'highsc');

        var ny = 190;
        const type = {
            origin: 'center',
            x: 200,
            style: {
                fontFamily: 'estilo',
                color: '#000000',
                fontSize: 25,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center'
            }
        }
        let resaltar = this.add.graphics({
            fillStyle: {
                color: 0xffff00, //color barra de cargar (CAMBIAR)
                alpha: 0.5,
                padding: 0

            }
        })
        //resaltarMJ.fillRect(46, 360, 705, 35);

        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        for (var i = 0; i < highScores.length; i++) {
            this.make.text(type).setText(highScores[i].name).setPosition(200, ny);
            //if(highScores[i].name==player1T.value) this.n1 = resaltar.fillRect(46, ny, 695, 35);
            this.make.text(type).setText(highScores[i].score).setPosition(600, ny);
            ny = ny + 60;
        }

        //Botones
    }
}