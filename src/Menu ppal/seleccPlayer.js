class PantallaSeleccion extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaSeleccion'});
    }
    init(){

    }
    create(){
        //CREACION ESCENA:
        //Fondo:
        this.add.image(400, 300, "bg");

        //Recuadro personaje 1
        this.rec = this.add.image(200, 150, "cuadro");
        this.rec.scale = 3.5;
        //Recuadro personaje 2
        this.rec2 = this.add.image(600, 150, "cuadro");
        this.rec2.scale = 3.5;

        //Personaje 1
        this.player1 = this.add.sprite(200, 150, "player").setInteractive();
        this.player1.setFrame(3);
        this.player1.scale = 3;
        //Personaje 2
        this.player2 = this.add.sprite(600, 150, "player").setInteractive();
        this.player2.setFrame(3);
        this.player2.scale = 3;

        //Configuracion texto:
        const configNombres = {
            origin: 'center',
            x: 200,
            y: 270,
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
        this.nombrePly2.setPosition(600, 270);

        //Botones aceptar: bloquean introducir nombre y van a siguiente pantalla
        this.aceptar1 = this.add.sprite(200, 320, "aceptar").setInteractive();
        this.aceptar2 = this.add.sprite(600, 320, "aceptar").setInteractive();

        //Boton menu: volver al menu
        this.menu = this.add.sprite(710, 530, "menu").setInteractive();

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
        this.modoCamp.setPosition(this.game.renderer.width/2, 420);

        this.modoVersus = this.make.text(configModos).setInteractive();
        this.modoVersus.setText('Versus');
        this.modoVersus.setPosition(this.game.renderer.width/2, 455);

        this.modoArc = this.make.text(configModos).setInteractive();
        this.modoArc.setText('Arcade');
        this.modoArc.setPosition(this.game.renderer.width/2, 490);
        
        //FUNCIONALIDAD:
        //Animacion personaje
        this.anims.create({
            key: 'pose',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        })

        //Interaccion texto:
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
        })
        this.aceptar2.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
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

    }
    update(time, delta){
        //Animacion personajes en pausa
        this.player1.anims.play('pose', true);
        this.player2.anims.play('pose', true);

        

    }
}

export default PantallaSeleccion;