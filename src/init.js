import PantallaCarga from './Menu ppal/loadScene.js'
import PantallaInicio from './Menu ppal/pantallaPpal.js'
import PantallaSeleccion from './Menu ppal/seleccPlayer.js';
import PantallaPartida from './Menu ppal/partida.js';

const config = {
  title: 'FoodMayhem',
  //url: 'http://127.0.0.1:8887/indexNerea.html',
  version: '0.0.1',

  pixelArt: true,

  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'container',
  backgroundColor: '#34495E',

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
  scene: [PantallaCarga, PantallaInicio, PantallaSeleccion, PantallaPartida]
};

//Instancia del juego
let game = new Phaser.Game(config);