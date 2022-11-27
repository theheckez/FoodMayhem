class PantallaInicio extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaInicio'});
    }
    init()
    {
        
    }

    create(){
        //this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "star");
        this.add.image(400, 300, "sky");
        this.add.image(150, 50, "logo").setOrigin(0);
        this.playButton = this.add.sprite(380, 350, "BotonPlay").setInteractive();
        this.playButton.scale = 3;

    }

    update(time, delta)
    {

        this.playButton.on("pointerover", ()=>{
            console.log("Encima");
            this.playButton.setFrame(1);
        })
        
        
        this.playButton.on("pointerout", ()=>{
            console.log("Saliendo del boton");
            this.playButton.setFrame(0);
        })
        
        
        this.playButton.on("pointerup", ()=>{
            this.playButton.setFrame(2);
            console.log("Cambio pantalla")
            this.scene.start("PantallaSeleccion", "hello from menu"); 
        })
        
    }

    
}

export default PantallaInicio;