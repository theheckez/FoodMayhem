class PantallaCarga extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaCarga'});
    }
    init(){

    }
    preload(){
        //Pantalla de carga
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //color barra de cargar (CAMBIAR)
            }
        })

        //Menu de Inicio
        this.load.image("bg", "assets/background.jpg");
        this.load.image("logo", "logo/LogoI-Scream.png");
        this.load.spritesheet('BotonPlay', 
            'assets/BotonPlay.png',
            { frameWidth: 64, frameHeight: 64 }
        );
        
        //------------------------------------------------------

        //Pantalla seleccion personaje
        //Personaje:
        this.load.spritesheet('player', 
            'SpritesheetJugadores/SpitesheetP1/SpritesheetP1(Andar).png',
            { frameWidth: 64, frameHeight: 64 }
        );
        //Recuadro personaje
        this.load.image("cuadro", "DiseñoInterfaz/elementosInterfaz/eleccionPersonaje.png");

        //Cargar letras:
        this.add.text(0, 0, '', {fontFamily: 'estilo'});
        this.add.text(0, 0, '', {fontFamily: 'titulo'});
        //Cargar fondo:
        this.load.image('name', 'DiseñoInterfaz/elementosInterfaz/recuadroTexto.png');

        //Aceptar
        this.load.spritesheet('aceptar', 
            'DiseñoInterfaz/Botones/botonOk.png',
            { frameWidth: 120, frameHeight: 47 }
        );
        //Menu
        this.load.spritesheet('menu', 
            'DiseñoInterfaz/Botones/botonMenu.png',
            { frameWidth: 120, frameHeight: 47 }
        );
        //flecha modo juego
        this.load.image("flechita", "DiseñoInterfaz/elementosInterfaz/flechita.png");

        //Escenario:
        this.load.spritesheet('pause', 
            'DiseñoInterfaz/Botones/botonPause.png',
            { frameWidth: 80, frameHeight: 47 }
        );

        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width*percent, 50);
            console.log(percent);
        })

        this.load.on("complete", ()=>{
            console.log('done');
        })
        
    }
    create(){
        
    }

    update(time, delta){
        this.scene.start("PantallaInicio", "hello from loadScene"); //esta linea para visualizar directamente Menu Ppal
    }
}

export default PantallaCarga;