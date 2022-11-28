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
        this.playButton = this.add.sprite(this.game.renderer.width/2, 400, "BotonPlay").setInteractive();
        this.playButton.scale = 3;

        //Interaccion botones
        this.playButton.on("pointerover", ()=>{
            document.body.style.cursor = "pointer";
            this.playButton.setFrame(1);
        })
        
        this.playButton.on("pointerout", ()=>{
            document.body.style.cursor = "auto";
            this.playButton.setFrame(0);
        })
        
        this.playButton.on("pointerdown", ()=>{
            this.playButton.setFrame(2); 
        })

        this.playButton.on("pointerup", ()=>{
            document.body.style.cursor = "auto";
            this.scene.start("PantallaSeleccion"); 
        })
    }

    update(time, delta)
    {
        //Logo:
        //this.logo.container: hover.imagen{-webkit-transform:this.scale(1.3);transform:this.scale(1.3);}
    }

    
}

export default PantallaInicio;