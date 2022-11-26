class PantallaSeleccion extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaSeleccion'});
    }
    init(){

    }
    preload(){
        this.load.spritesheet('player', 
            'PersonajePrincipal/IcyFrontAnimation1.png',
            { frameWidth: 64, frameHeight: 64 }
        );
    }
    create(){
        
    }
}

export default PantallaSeleccion;