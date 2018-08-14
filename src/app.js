import {
  joystick,
  commands
  // remote
} from './engime/keyboard'
import {
  move
} from './engime/animation'
// var labth = require('./js/engime/labth')
import {
  collision,
  leap,
  moveMap
} from './engime/collision'
import Changer from './engime/Changer'
import Labth from './engime/labthIsometric'
import Monsters from './engime/Monsters'
import Persona from './engime/Persona'
import battle from './engime/battle'
import hp from './engime/hp'
import attributes from './engime/attributes'
import itens from './engime/itens'
/**
 * SCENES
 *
 * */
// import home from './scene/home'
// import movie from './scene/movie'
import Labirinty from './scene/Labirinty'

// gaming
import Game from './engime/game'

const packages = {
  // controllers
  joystick,
  // joystick: remote,
  // fisicas do sistema
  fisic: {
    // colisões entre objetos
    collision,
    moveMap,
    leap
  },
  action: {
    // gerenciador de batalhas do game
    battle,
    // commandos digitados no game
    commands,
    // preparando o move parts person, onde é responsavel pela animações de sprite
    animation: {
      move
    },
    // helth
    hp,
    attributes,
    itens
  },
  map: {
    // gerando labirintys
    labth: new Labth()
  },
  // monstros
  monsters: new Monsters(),
  persona: new Persona(),
  // storage ofthe sprites
  sprites: {
    map: [],
    monsters: []
  },
  // senas do jogo
  scenes: [
    new Labirinty()
    // home.instance(lalo)
  ],
  // changer the scenes
  changer: new Changer()
}

/*
-----------------
gameing instance
-----------------
*/
export default new Game(packages)
