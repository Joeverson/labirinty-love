import "@babel/polyfill";

import Game from './engime/game'
import Changer from './engime/Changer'

// maps
import labth from './engime/labth'

// scenes
import Labirinty from './scene/labirinty/scene'

// libs
import Sprite from './engime/n/sprite'
import attributes from './engime/n/attributes'
import {
  joystick,
  commands
} from './engime/keyboard'
import {
  collision,
  leap,
} from './engime/collision'

import Monsters from './engime/Monsters'

const lalo = new Game({
  changer: new Changer([
    Labirinty
  ]),
  Sprite,
  monsters: new Monsters(),
  attributes,
  map: {
    labth
  },
  joystick,
  commands,
  collision,
  leap
})

lalo.start()