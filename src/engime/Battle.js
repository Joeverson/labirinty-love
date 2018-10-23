import utils from '../utils/utils'
import hp from '../engime/hp'

/**
 *
 * esse escript é completamente voltado
 * para a forma de batalhas PvE no sistema
 *
 * todo o comportamento durante a batalha vai esta aqui
 * descrita e programada, no caso essa lib entra em funcionabilidade
 * quando o persona entra em contato com um monstro
 *
 *
 */

class Battle {
  constructor() {

  }

  fight (lalo, {...sprites}) {
    this.lalo = lalo
    const persona = sprites.persona
    const monster = sprites.monster

    // show bar
    hp.showBar(persona)
    hp.showBar(monster)

    // açaõ de atacar o oponente
    this.attack(persona, monster)

    console.log(persona.atributos, monster.atributos)
  }

  /**
   * atack dos personagens
   *
   * @param {*} persona
   * @param {*} monster
   */
  attack (persona, monster) {
    const p = persona.atributos
    const m = monster.atributos

    /**
     * aquele que tem maior velocidade é quem ataca
     * primeiro
     */
    if (m.velocidade > p.velocidade) {
      hp.damage(persona, m.forca)

      // miss attack
      if (utils.random(m.velocidade * 3) < m.velocidade) {
        hp.damage(monster, p.forca)
      } else {
        console.log('miss monster')
      }
    } else {
      hp.damage(monster, p.forca)

      // miss attack
      if (utils.random(m.velocidade * 3) < m.velocidade) {
        hp.damage(persona, m.forca)
      } else {
        console.log('miss you')
      }
    }
  }

  /**
   * text the MISS
   */
  miss (sprite) {
    sprite.addChild(utils.text('miss'))
  }

  /**
   * Fazendo um zoom no personagem durante uma batalha
   *
   */
  zoom() {
    // fazendo o zook no ambiente
    this.lalo.application.stage.scale.x = 2
    this.lalo.application.stage.scale.y = 2

    // deixando o zoom no personagem
    this.lalo.application.stage.x = (-1 * (this.lalo.getContainer('labirinth').getContainer('persona').x))
    this.lalo.application.stage.y = (-1 * (this.lalo.getContainer('labirinth').getContainer('persona').y))
  }
}

export default new Battle()