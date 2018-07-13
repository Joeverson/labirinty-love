import {
  keyboard,
  joystick,
  commands,  
  remote
} from './engime/keyboard';
import animation from './engime/animation';
// var labth = require('./js/engime/labth')
import {
  collision,
  moveMap
} from './engime/collision';
import Changer from './engime/Changer';
import labth from './engime/labthIsometric';
import Monsters from './engime/Monsters';


/**
 * SCENES
 * 
 * **/
import home from './scene/home';
import movie from './scene/movie';
import Labirinty from './scene/Labirinty';

// gaming
import Game from './engime/game';



//construct
const packages = {
  //carregando o objeto para controllers
  joystick: remote,
  keyboard,
  moveMap,
  // commands digitados no game
  commands,
  //instanciando as colisões
  collision,
  // preparando o move parts person, onde é responsavel pela animações de sprite andnada
  animation,
  //gerando labirintys
  labth,
  //monstros
  monsters: new Monsters(),
  //storage ofthe sprites
  sprites: {
    map: [],
    monsters: []
  },
  // senas do jogo
  gameScenes: {
    labirinty: new Labirinty()
    // home: home.instance(lalo)
  },
};

//alterador de telas do game
packages.changer = new Changer(packages.gameScenes);

/*
-----------------
gameing instance
-----------------
*/
export default new Game(packages);
