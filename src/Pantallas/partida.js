class PantallaPartida extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaPartida'});
    }
    init(){

    }
    create(){
        this.texto = this.add.text(0, 300, 'Escenario: aqui iria la pantalla q ha hecho Rosa', {
            color: '#000000',
            fontSize: 40,
            textAlign: 'center',
            justifyContent: 'center',
            fontFamily: 'Bell MT',
        });

        this.pause = this.add.sprite(380, 50, "pause").setInteractive();

        this.victoria = this.add.text(200, 400, "Victoria").setInteractive();
        this.derrota = this.add.text(600, 400, "Derrota").setInteractive();

        //Interaccion botones
        this.pause.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
        })
        
        this.pause.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
        })
        
        this.pause.on("pointerdown", ()=>{
            this.pause.setFrame(1); 
        })

        this.pause.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            this.scene.start("PantallaPausa"); 
        })

        this.victoria.on("pointerdown", ()=>{
            this.scene.start("ResultadoVictoria");
        })
        this.derrota.on("pointerdown", ()=>{
            this.scene.start("ResultadoDerrota");
        })
    }
}
export default PantallaPartida;