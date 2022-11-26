class PantallaInicio extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaInicio'});
    }
    init()
    {
        
    }
    preload(){
        this.load.image("sky", "assets/sky.png");
        this.load.image("logo", "logo/LogoI-Scream.png");
        this.load.spritesheet('BotonPlay', 
            'Diseño Interfaz/BotonPlay.png',
            { frameWidth: 64, frameHeight: 64 }
        );
    }
    create(){
        //this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "star");
        this.add.image(400, 300, "sky");
        this.add.image(60, 0, "logo").setOrigin(0);
        this.playButton = this.add.sprite(300, 300, "BotonPlay").setInteractive();
        playButton.scale = 3;
    }
    update(time, delta)
    {
        playButton.on("pointover", ()=>{
            console.log("Encima del boton")
        })
        
        playButton.on("pointerout", ()=>{
            console.log("Saliendo del boton")
        })
        
        playButton.on("pointerup", ()=>{
            console.log("Open the gates")
        })
    }
}

export default PantallaInicio;