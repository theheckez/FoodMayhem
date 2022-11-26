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
        this.add.image(150, 50, "logo").setOrigin(0);
        this.playButton = this.add.sprite(380, 350, "BotonPlay").setInteractive();
        this.playButton.scale = 3;

        //Animar boton:
        this.anims.create({
            key: 'pasar',
            frameRate: 64,
            frames: 1
        });
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
        
        
        this.playButton.on("pointerdown", ()=>{
            console.log("Open the gates")
            this.playButton.setFrame(3);
            this.scene.start("PantallaSeleccion", "hello from menu"); 
        })
        
    }

    
}

export default PantallaInicio;