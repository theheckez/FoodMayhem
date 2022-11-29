class PantallaCarga extends Phaser.Scene {
    constructor(){
        super({key: 'PantallaCarga'});
    }
    init(){

    }
    preload(){
        //Pantalla de carga
        
        this.load.image("empresa", 'logo/BakeryStudiosLogo.png');

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff 
            }
        })

        //-------------------------------------------------------

        //Menu de Inicio
        this.load.image("bg", "DiseñoInterfaz/elementosInterfaz/pantallaInicio.png");
        this.load.image("logo", "logo/LogoI-ScreamFondoBlanco.png");
        this.load.spritesheet('BotonPlay', 
            'DiseñoInterfaz/Botones/BotonPlay.png',
            { frameWidth: 120, frameHeight: 47 }
        );
        
        //------------------------------------------------------

        //Pantalla seleccion personaje
        //Background
        this.load.image("bg2", "DiseñoInterfaz/elementosInterfaz/pantallaSeleccion.png");
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
        this.add.text(0, 0, '', {fontFamily: 'damage'});
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
        //Play
        this.load.spritesheet('play', 
            'DiseñoInterfaz/Botones/BotonPlay.png',
            { frameWidth: 120, frameHeight: 47 }
        );

        //flecha modo juego
        this.load.image("flechita", "DiseñoInterfaz/elementosInterfaz/flechita.png");

        //-----------------------------------------------------------------------------------
        //Escenario:
        this.load.spritesheet('pause', 
            'DiseñoInterfaz/Botones/botonPause.png',
            { frameWidth: 80, frameHeight: 47 }
        );

        //------------------------------------------------------------------------------------

        //Menu Pausa
        //Background:
        this.load.image("stop", "DiseñoInterfaz/elementosInterfaz/pantallaPausa.png");
        //Botones
        //x
        this.load.spritesheet('exit',
            'DiseñoInterfaz/Botones/botonX.png',
            { frameWidth: 80, frameHeight: 47 }
        );

        //Iconos:
        this.load.image('iconoJ1', 'DiseñoInterfaz/elementosInterfaz/cabezaMorada.png');
        this.load.image('iconoJ2', 'DiseñoInterfaz/elementosInterfaz/cabezaAzul.png');

        //Variables
        //Barra vida:
        this.load.image('vidaJ1', 'assets_Rosa/interfaz/barraVidaP1.png');
        this.load.image('vidaJ2', 'assets_Rosa/interfaz/barraVidaP2.png');
        this.load.image('nivelVidaJ1', 'InterfazEscenaJuego/barraVidaP1.png');

        this.load.on("progress", (percent)=>{
            /*let start = Date.now();
            let timer = setInterval(function(){
                let timePassed = Date.now() - start;
                if(timePassed >= 2000){
                    clearInterval(timer);
                    return;
                }
                draw(timePassed);
            }, 20);*/
            loadingBar.fillRect(100, 350, 600*percent, 40);
            console.log(percent);
        })

        this.load.on("complete", ()=>{
            console.log('done');
        })
        
    }
    create(){
        this.add.image(400, 250, 'empresa');
        this.helado = this.add.image(100, 350, 'iconoJ1');
    }

    update(time, delta){
        this.scene.start("PantallaInicio"); //esta linea para visualizar directamente Menu Ppal
    }
    /*
    draw(time)
    {
        this.helado.style.left = time/5 + 'px';
    }*/
}

export default PantallaCarga;