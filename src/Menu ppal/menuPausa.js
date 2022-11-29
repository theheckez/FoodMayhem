class PantallaPausa extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaPausa'});
    }
    init(){

    }
    create(){
        //CREACION ESCENA
        //Background
        this.add.image(400, 300, "stop");

        //Titulo PAUSA
        //Modo de juego:
        const confTitulo = {
            origin: 'center',
            x: this.game.renderer.width/2,
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
        this.exit.scale = 0.8;
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
        this.make.text(confJugadores).setText('Player 2').setPosition(this.game.renderer.width*3/4, 180);
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
        this.make.text(confVariables).setText('Vida');
        this.add.image(260, 270, 'vidaJ1');

        this.make.text(confVariables).setText('Vida').setPosition(470, 270);
        this.add.image(610, 270, 'vidaJ2');

        let vidaJ1 = this.add.graphics({
            fillStyle: {
                color: 0x32C93B
            }
        })
        //Vida Jugador 1:
        if(vidaP1 == 100) {
            vidaJ1.fillRect(214, 265, 132, 10);
        } else if (vidaP1 < 100 && vidaP1 > 0) {
            vidaJ1.fillRect(214, 265, (132/100)*vidaP1, 10);
        } else if (vidaP1 <= 0) {
            vidaJ1.fillRect(214, 265, 0, 10);
        }
        //Vida Jugador 2:
        if(vidaP2 == 100) {
            vidaJ1.fillRect(657, 265, -132, 10);
        } else if (vidaP2 < 100 && vidaP1 > 0) {
            vidaJ1.fillRect(657, 265, -(132/100)*vidaP2, 10);
        } else if (vidaP2 <= 0) {
            vidaJ1.fillRect(657, 265, 0, 10);
        }
        //Daño de ataque
        this.make.text(confVariables).setText('Fuerza').setPosition(140, 350);
        this.make.text(confVariables).setText('Fuerza').setPosition(490, 350);

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
        this.make.text(confDamage).setText('x'+fuerzaP1);
        this.make.text(confDamage).setText('x'+fuerzaP2).setPosition(610, 350);

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
            this.scene.start("PantallaPartida");
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
            document.body.style.cursor = "auto";
        })

    }
}
export default PantallaPausa;