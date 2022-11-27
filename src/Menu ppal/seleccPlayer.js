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

        //Recuadro personaje
        this.rec = this.add.image(this.game.renderer.width/2, 150, "cuadro");
        this.rec.scale = 3.5;

        //Personaje
        this.player = this.add.sprite(this.game.renderer.width/2, 150, "player").setInteractive();
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
        this.aceptar = this.add.sprite(this.game.renderer.width/2, 320, "aceptar").setInteractive();

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
            this.scene.start("PantallaPartida"); 
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
        //Animacion personaje en pausa
        this.player.anims.play('pose', true);

        

    }
}

export default PantallaSeleccion;