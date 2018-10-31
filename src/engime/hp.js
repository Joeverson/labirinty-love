/**
 *
 * essa lib é responsavel por desenhar a barra de lige na cabeça do carinha
 *
 *
 */

export default {
  bar: (sprite, color) => {
    color = color || 0xEF5350

    var graphics = new PIXI.Graphics()

    graphics.lineStyle(3, 0x000000, 1)
    graphics.beginFill(color, 0.95)
    graphics.drawRoundedRect(50, 450, 300, 20, 5)
    graphics.endFill()

    graphics.x = -25
    graphics.y = -110
    graphics.scale.x = 0.2
    graphics.scale.y = 0.2
    graphics.visible = false
    graphics.name = 'health'

    sprite.addChild(graphics)
  },
  /**
   * representação de dano do personagem
   *
   * @param {*} sprite
   * @param {int} damage
   */
  damage (sprite, damage) {
    if (sprite.atributos.hp > 0) {
      // diminuindo o hp nos atributos
      sprite.atributos.hp -= damage

      if ((sprite.atributos.hp - damage) > 0) {
        // diminuindo o hp visualmente no game
        sprite.children[0].width -= this.hpBarPorcent(sprite.atributos.hp, damage, sprite.children[0].width)
      } else {
        this.die(sprite)
      }
    }
  },

  showBar (sprite) {
    sprite.children[0].visible = true
  },
  /**
   * die é um metodo que mata o persona
   * basicamento faxz ele sumir e dar atributos ao persona
   *
   * */
  die (sprite) {
    // faz com que o sprite suma
    sprite.visible = false
  },
  /**
   * calc porcent damage in persona
   * calculo para saber o quanto vai diminuir da barrinha de life
   *
   * recebe o hp:int damage:int barWidth:int
   */
  hpBarPorcent (hp, damage, barWidth) {
    return (damage / hp) * barWidth
  }
}
