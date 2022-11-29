import PantallaCarga from './Pantallas/loadScene.js'
import PantallaInicio from './Pantallas/pantallaPpal.js'
import PantallaSeleccion from './Pantallas/seleccPlayer.js';
import PantallaPartida from './Pantallas/partida.js';
import PantallaPausa from './Pantallas/menuPausa.js';
import ResultadoVictoria from './Pantallas/victoria.js';
import ResultadoDerrota from './Pantallas/derrota.js';

const config = {
  title: 'FoodMayhem',
  //url: 'http://127.0.0.1:8887/indexNerea.html',
  version: '0.0.1',

  pixelArt: true,

  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'container',
  backgroundColor: '#5B2970',

  banner:{
    hidePhaser: true,
    text: '#000000',
    backgorund: [
      'red',
      'yellow',
      'red',
      'transparent'
    ]
  },
  //ESCENAS:
  scene: [PantallaCarga, PantallaInicio, PantallaSeleccion, PantallaPartida, PantallaPausa, ResultadoVictoria, ResultadoDerrota]
};

//Instancia del juego
let game = new Phaser.Game(config);