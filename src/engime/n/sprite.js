import attributes from './attributes'
import { collision } from '../collision'
import animation from '../animation'
import hp from '../hp'

export default class Sprite {
  constructor ({...config}) {
    Object.assign(this, config)
  }
  /**
   *
   * load é um metodo te permite que vc movimente o personagem 
   * com os controles, vc passa as coordenadas do sprite que sera
   * alterado ao se mover
   *
   * lalo = object game
   * sheet = folha de estilo onde esta o sprite do persona
   * coords = coordenadas do persona para as movimentações, seguindo o padrão do animations.js
   * size = tamanho em pixel do personagem
   */

  load(lalo, sheet, coords, size) {
    return new Promise(resolve => {
      PIXI.loader
        .add(this.name, sheet).load((loader, resources) => {

          // preparando o person
          resources[this.name].texture.frame = animation.move.load(coords, size).default

          const sprite = new PIXI.Sprite(resources[this.name].texture)

          /*
           *  gerando os atributos de forma aleatoria para os monstros
           *  atribuindo nova propriedade para o sprite
          */
         
          sprite.atributos = lalo.attributes.create()

          // adicionando a barra de health
          hp.bar(sprite)
          
          // atribuindo ao lalo as sprites para serem usdas em qualquer lugar
          sprite.vx = 0
          sprite.vy = 0
          
          // nome do sprite
          sprite.name = this.name

          sprite.x = window.innerWidth / 2
          sprite.y = window.innerHeight / 2

          resolve(sprite)
        })
    })
  }

  // collision
  collision(object) {    
    return collision(this.sprite, object)    
  }

  // atribbutes do sprite
  atribbutes() {
    this.sprite.atribbutes = attributes.create()
    return this
  }
}