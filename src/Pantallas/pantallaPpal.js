class PantallaInicio extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaInicio'});
    }
    init()
    {
        
    }

    create(){
        //this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "star");
        this.add.image(400, 300, "bg");
        this.logo = this.add.image(this.game.renderer.width/2, 200, "logo").setOriginFromFrame('center');
        this.logo.scale = 1.2;
        this.playButton = this.add.sprite(this.game.renderer.width/2, 350, "BotonPlay").setInteractive();
        this.marco = this.add.image(this.game.renderer.width/2, 350, 'marco').setVisible(false);
        this.marco.scale = 1.2;

        //Interaccion botones
        this.playButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.marco.setVisible(true);
        })
        
        this.playButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.marco.setVisible(false);
        })
        
        this.playButton.on("pointerdown", ()=>{
            this.playButton.setFrame(1);
            this.marco.setVisible(false); 
        })

        this.playButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            this.scene.start("PantallaSeleccion"); 
        })
    }

    update(time, delta)
    {
        //Logo:
        
    }

    
}

export default PantallaInicio;