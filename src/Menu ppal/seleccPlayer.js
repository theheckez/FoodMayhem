class PantallaSeleccion extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaSeleccion'});
    }
    init(){

    }
    preload(){
        this.load.image("sky", "assets/sky.png");
        this.load.spritesheet('player', 
            'SpritesheetJugadores/SpitesheetP1/SpritesheetP1(Andar).png',
            { frameWidth: 64, frameHeight: 64 }
        );
    }
    create(){
        //Fondo:
        this.add.image(400, 300, "sky");

        //Personaje
        this.player = this.add.sprite(400, 200, "player").setInteractive();
        this.player.setFrame(3);
        this.player.scale = 3;

        //Texto jugador:
        /*
        const player1 = {
            x: 320,
            y: 300,
            text: 'Player 1',
            style: {
                color: '#000000',
                fontSize: 30
            }
        }
        */
        this.player1 = this.add.text(300, 300, 'Player 1', {
            color: '#000000',
            fontSize: 30,
            //fontStyle: 'bold',
            padding: {
                top: 20,
                bottom: 0,
                left: 20,
                right: 0
            }
        }).setInteractive();
        


        this.anims.create({
            key: 'pose',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        })

        /*
        this.nombreJugador = function(p){
            var nombre = prompt('');
            p.setText(nombre);
            document.close();
        }
        const keys = Phaser.Input.Keyboard.KeyCodes;
        this.keyEnter = this.input.keyboard.addKeyy(keys.ENTER);
        this.keyEnter.on('down', () =>{
            console.log('Has pulsado enter');
        })
        */

    }
    update(time, delta){
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
}

export default PantallaSeleccion;