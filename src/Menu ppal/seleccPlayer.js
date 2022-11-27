class PantallaSeleccion extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaSeleccion'});
    }
    init(){

    }
    create(){
        //CREACION ESCENA:
        //Fondo:
        this.add.image(400, 300, "sky");

        //Personaje
        this.player = this.add.sprite(this.game.renderer.width/2, 200, "player").setInteractive();
        this.player.setFrame(3);
        this.player.scale = 3;

        //Nombre jugador:
        this.player1 = this.add.text(270, 300, 'Introduce tu nombre', {
            color: '#000000',
            fontSize: 30,
            backgroundColor: '#e8eaeb',
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
        this.aceptar = this.add.sprite(this.game.renderer.width/2, 400, "aceptar").setInteractive();

        //Boton menu: volver al menu
        this.menu = this.add.sprite(710, 540, "menu").setInteractive();
        
        //FUNCIONALIDAD:
        //Animacion personaje
        this.anims.create({
            key: 'pose',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        })

        //Introducir nombre jugador
        this.player1.on("pointerdown", () =>{
            console.log("Cambiar nombre")
            this.player1.setText(' ');
            var n = prompt('Introduce nombre: ', 'Player1');
            console.log(n)
            if(n == null) this.player1.setText('Player1');
            else this.player1.setText(n);
            this.player1.setPosition(350, 300);
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

        //Animacion boton ok
        this.aceptar.on("pointerup", () =>{
            this.aceptar.setFrame(1);
        })

        //Animacion boton menu
        this.menu.on("pointerup", () =>{
            this.menu.setFrame(1);
            this.scene.start("PantallaInicio");
        })

    }
}

export default PantallaSeleccion;