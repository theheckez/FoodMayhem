class PantallaPausa extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaPausa'});
    }
    init(){

    }
    create(){
        //CREACION ESCENA
        //Background
        this.add.image(400, 300, "bg2");

        //Titulo PAUSA
        //Modo de juego:
        const confTitulo = {
            origin: 'center',
            x: this.game.renderer.width/2,
            y: 100, 
            text: 'PAUSA', 
            style: {
                color: '#5e5e5e',
                fontSize: 30,
                fontFamily: 'titulo'
            }
        }
        this.make.text(confTitulo);

        //Botones
        //x
        this.exit = this.add.sprite(710, 70, "exit").setInteractive();
        this.exit.scale = 0.8;

        //Jugadores
        const confJugadores = {
            origin: 'left',
            x: this.game.renderer.width/4,
            y: 150,
            style: {
                fontFamily: 'estilo',
                color: '#5e5e5e',
                fontSize: 25,
                fontStyle: 'italic',
                textAlign: 'center',
                justifyContent: 'center',
            }
        }
        //this.make.text(confJugadores).setText(player1.text); --> PONERLO ASI
        this.make.text(confJugadores).setText('Player 1');
        this.make.text(confJugadores).setText('Player 2').setPosition(this.game.renderer.width*3/4, 150);
    }
}
export default PantallaPausa;