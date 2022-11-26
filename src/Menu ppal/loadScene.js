export class PantallaCarga extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaCarga'});
    }
    init(){

    }
    preload(){
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //color barra de cargar (CAMBIAR)
            }
        })

        //Loader events:
        //-complete: done loading everything
        //-progress: loader number of progress in decimal

        //Simulate large load
        /*
        for(let i  = 0; i < 100; i++){
            this.load.spritesheet('BotonPlay', 
            'assets/BotonPlay.png',
            { frameWidth: 50, frameHeight: 60 });
        }
        */

        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width*percent, 50);
            console.log(percent);
        })

        this.load.on("complete", ()=>{
            console.log('done');
        })
        
    }
    create(){
        this.scene.start("PantallaInicio", "hello from loadScene"); //esta linea para visualizar directamente Menu Ppal
    }
}

export default PantallaCarga;