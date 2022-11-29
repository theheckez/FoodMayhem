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
                color: 0xc0d470, 
                alpha: 0.4,
            }
        })
        recuadroP.fillRect(80, 140, 640, 300);
        let resaltarP = this.add.graphics({
            fillStyle: {
                color: 0xc0d470, 
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
        this.marcoMenu = this.add.image(400, 500, 'marco').setVisible(false);
        this.marcoMenu.scale = 1.2;

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
        //this.make.text(confJugadores).setText(player1.text); 
        //this.make.text(confJugadores).setText(player2.text).setPosition(this.game.renderer.width*3/4, 180); 
        this.make.text(confJugadores).setText('Player 1');
        this.make.text(confJugadores).setText('Player 2').setPosition(this.game.renderer.width*3/4, 180);
        //Iconos jugadores
        this.add.image(140, 180, 'iconoJ1');
        this.add.image(500, 180, 'iconoJ2');

        //Variables
        const confVariables = {
            origin: 'center',
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
        this.add.image(260, 275, 'vidaJ1');

        this.make.text(confVariables).setText('Vida').setPosition(470, 270);
        this.add.image(610, 275, 'vidaJ2');

        let vida = this.add.graphics({
            fillStyle: {
                color: 0x32C93B
            }
        })
        //Vida Jugador 1:
        if(vidaP1 == 100) {
            vida.fillRect(214, 267, 132, 10);
        } else if (vidaP1 < 100 && vidaP1 > 0) {
            vida.fillRect(214, 267, (132/100)*vidaP1, 10);
        } else if (vidaP1 <= 0) {
            vida.fillRect(214, 267, 0, 10);
        }
        //Vida Jugador 2:
        if(vidaP2 == 100) {
            vida.fillRect(657, 267, -132, 10);
        } else if (vidaP2 < 100 && vidaP1 > 0) {
            vida.fillRect(657, 267, -(132/100)*vidaP2, 10);
        } else if (vidaP2 <= 0) {
            vida.fillRect(657, 267, 0, 10);
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
            this.marcoMenu.setVisible(true);
            document.body.style.cursor = "pointer";
        })
        this.menu.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerdown", ()=>{
            this.menu.setFrame(1); 
            this.marcoMenu.setVisible(false);
        })
        this.menu.on("pointerup", ()=>{
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
            this.pestaña.setVisible(false);
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
            this.marcoYes.setVisible(true);
        })
        this.yes.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.marcoYes.setVisible(false);
        })
        this.yes.on("pointerdown", ()=>{
            this.yes.setFrame(1);
            this.marcoYes.setVisible(false); 
        })
        this.yes.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            this.scene.start("PantallaInicio");
        })
        //no
        this.no.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.marcoNo.setVisible(true);
        })
        this.no.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.marcoNo.setVisible(false);
        })
        this.no.on("pointerdown", ()=>{
            this.no.setFrame(1); 
            this.marcoNo.setVisible(false);
        })
        this.no.on("pointerup", ()=>{
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
}
export default PantallaPausa;