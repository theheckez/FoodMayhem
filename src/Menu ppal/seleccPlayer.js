class PantallaSeleccion extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaSeleccion'});
    }
    init(){
    }
    create(){
        //CREACION ESCENA:
        //Fondo:
        this.add.image(400, 300, "bg2");

        //Recuadro personaje 1
        this.rec = this.add.image(210, 170, "cuadro");
        this.rec.scale = 3.5;
        //Recuadro personaje 2
        this.rec2 = this.add.image(590, 170, "cuadro");
        this.rec2.scale = 3.5;

        //Personaje 1
        this.player1 = this.add.sprite(210, 170, "player").setInteractive();
        this.player1.setFrame(3);
        this.player1.scale = 3;
        //Personaje 2
        this.player2 = this.add.sprite(590, 170, "player").setInteractive();
        this.player2.setFrame(3);
        this.player2.scale = 3;

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
        this.nombrePly1 = this.make.text(configNombres).setInteractive();
        //Nombre jugador 2:
        this.nombrePly2 = this.make.text(configNombres).setInteractive();
        this.nombrePly2.setPosition(590, 290);

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
            x: this.game.renderer.width/2,
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
        this.modoCamp.setPosition(this.game.renderer.width/2, 420);

        this.modoVersus = this.make.text(configModos).setInteractive();
        this.modoVersus.setText('Versus');
        this.modoVersus.setAlpha(0.5);
        this.modoVersus.setPosition(this.game.renderer.width/2, 460);

        this.modoArc = this.make.text(configModos).setInteractive();
        this.modoArc.setText('Arcade');
        this.modoArc.setPosition(this.game.renderer.width/2, 500);

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


        //Interaccion nombres:
        //Jugador1:
        this.nombrePly1.on("pointerover", ()=>{
            document.body.style.cursor = "text";
        })
        this.nombrePly1.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
        })
        this.nombrePly1.on("pointerdown", () =>{
            this.nombrePly1.setText(' ');
            var n = prompt('Introduce nombre: ', 'Player1');
            console.log(n)
            if(n == null) this.nombrePly1.setText('Player1');
            else this.nombrePly1.setText(n);
        })
        this.nombrePly1.on("pointerup", ()=>{
            document.body.style.cursor = "auto"; 
        })

        //Jugador2
        this.nombrePly2.on("pointerover", ()=>{
            document.body.style.cursor = "text";
        })
        this.nombrePly2.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
        })
        this.nombrePly2.on("pointerdown", () =>{
            this.nombrePly2.setText(' ');
            var n = prompt('Introduce nombre: ', 'Player2');
            console.log(n)
            if(n == null) this.nombrePly1.setText('Player2');
            else this.nombrePly2.setText(n);
        })
        this.nombrePly2.on("pointerup", ()=>{
            document.body.style.cursor = "auto"; 
        })
        

        //Interaccion botones
        this.ready = 0;
        //ok 1:
        this.aceptar1.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
        })
        this.aceptar1.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
        })
        this.aceptar1.on("pointerdown", ()=>{
            this.aceptar1.setFrame(1); 
            if(this.nombrePly1.text == 'Introduce tu nombre:'){
                this.nombrePly1.setText('Player1');
            }
            this.nombrePly1.disableInteractive();
            this.ready++;
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
            if(this.nombrePly2.text == 'Introduce tu nombre:'){
                this.nombrePly2.setText('Player2');
            }
            this.nombrePly2.disableInteractive();
            this.ready++;
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
        
        this.teclasJ1.w.on('down', () =>{
            if(this.flechita.y > 420)
                this.flechita.setPosition(320, this.flechita.y-40);
        })
        this.teclasJ1.s.on('down', () =>{
            if(this.flechita.y < 500)
                this.flechita.setPosition(320, this.flechita.y+40);
        })

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
            if(this.flechita.y == 500) this.scene.start("PantallaPartida");
            else this.play.setFrame(0);
        })

    }
    update(time, delta){
        //Animacion personajes en pausa
        this.player1.anims.play('pose', true);
        this.player2.anims.play('pose', true);

        //Modos juego
        if(this.flechita.y == 420) this.modoCamp.setFontSize(22);
        if(this.flechita.y != 420) this.modoCamp.setFontSize(20);

        if(this.flechita.y == 460) this.modoVersus.setFontSize(22);
        if(this.flechita.y != 460) this.modoVersus.setFontSize(20);

        if(this.flechita.y == 500) this.modoArc.setFontSize(22);
        if(this.flechita.y != 500) this.modoArc.setFontSize(20);


        //Cambiar de pantalla:
        if(this.ready == 2)
        {
            this.ready = 0;
            console.log('aparece');
            this.play.setVisible(true);;
        }

    }
}

export default PantallaSeleccion;