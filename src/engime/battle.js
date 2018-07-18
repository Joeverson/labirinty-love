import utils from '../utils/utils'

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

export default {
  lalo: {},
  fight (lalo, {...sprites}) {
    this.lalo = lalo
    const persona = sprites.persona
    const monster = sprites.monster

    // show bar
    lalo.action.hp.showBar(persona)
    lalo.action.hp.showBar(monster)

    // açaõ de atacar o oponente
    this.attack(persona, monster)

    console.log(persona.atributos, monster.atributos)
  },
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
      this.lalo.action.hp.damage(persona, m.forca)

      // miss attack
      if (utils.random(m.velocidade * 3) < m.velocidade) {
        this.lalo.action.hp.damage(monster, p.forca)
      } else {
        console.log('miss monster')
      }
    } else {
      this.lalo.action.hp.damage(monster, p.forca)

      // miss attack
      if (utils.random(m.velocidade * 3) < m.velocidade) {
        this.lalo.action.hp.damage(persona, m.forca)
      } else {
        console.log('miss you')
      }
    }
  },
  /**
   * text the MISS
   */
  miss (sprite) {
    sprite.addChild(utils.text('miss'))
  },

  /**
   * Fazendo um zoom no personagem durante uma batalha
   *
   */
  zoom: () => {
    // fazendo o zook no ambiente
    this.a.lalo.game.stage.scale.x = 2
    this.a.lalo.game.stage.scale.y = 2

    // deixando o zoom no personagem
    this.a.lalo.game.stage.x = (-1 * (this.a.lalo.sprites.persona.x))
    this.a.lalo.game.stage.y = (-1 * (this.a.lalo.sprites.persona.y))
  }
}
