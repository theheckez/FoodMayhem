class ResultadoVictoria extends Phaser.Scene {
    constructor(){
        super({key: 'ResultadoVictoria'});
    }
    create()
    {
        //CREACION ESCENARIO
        //Escenario
        this.add.image(400, 300, 'escenario');
        //Filtro
        let filtro = this.add.graphics({
            fillStyle: {
                color: 0x5b2970, //color barra de cargar (CAMBIAR)
                alpha: 0.5,
            }
        })
        filtro.fillRect(0, 0, 800, 600);
        //Victoria
        const confTitulo = {
            origin: 'center',
            x: this.game.renderer.width/2,
            y: 150, 
            text: 'VICTORIA', 
            style: {
                color: '#ffffff',
                fontSize: 60,
                fontFamily: 'titulo'
            }
        }
        this.make.text(confTitulo);

        //Kills jugadores
        const confKills = {
            origin: 'center',
            x: 240,
            y: 230,
            style: {
                fontFamily: 'estilo',
                color: '#ffffff',
                fontSize: 25,
                fontStyle: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        //this.make.text(confJugadores).setText(player1.text); --> PONERLO ASI
        //this.make.text(confJugadores).setText(player2.text).setPosition(this.game.renderer.width*3/4, 150); --> PONERLO ASI
        this.make.text(confKills).setText('Player 1');
        this.make.text(confKills).setText('Player 2').setPosition(this.game.renderer.width*3/4, 230);
        //Iconos jugadores
        this.add.image(140, 230, 'iconoJ1');
        this.add.image(500, 230, 'iconoJ2');

        //Salir
        this.salir = this.add.sprite(400, 500, "aceptar").setInteractive();

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
            '¿Volver al menú principal?').setPosition(
                400, 230).setFontSize(25).setVisible(false);
        //warning
        //x
        this.exit2 = this.add.sprite(625, 185, "exit").setVisible(false);
        this.exit2.scale = 0.6;
        //yes y no
        this.yes = this.add.sprite(300, 350, 'yes').setVisible(false);
        this.no = this.add.sprite(500, 350, 'no').setVisible(false);

        //FUNCIONALIDAD
        this.salir.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
        })
        this.salir.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
        })
        this.salir.on("pointerdown", ()=>{
            this.salir.setFrame(1); 
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
            this.pestaña.setVisible(false);
            this.abandonar.setVisible(false);
            this.exit2.setVisible(false).disableInteractive();
            this.yes.setVisible(false).disableInteractive();
            this.no.setVisible(false).disableInteractive();
            this.salir.setInteractive();
        })
    }
    update(time, date)
    {

    }
}
export default ResultadoVictoria;