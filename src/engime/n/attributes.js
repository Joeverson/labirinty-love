import utils from '../../utils/utils'
/**
 *
 * lib usada para gerenciar os atributos dos personagens
 *
 */

export default {
  // atributos e seus valores maximos
  max: {
    FORCA: 10,
    VELOCIDADE: 10,
    HP: 50
  },

  /**
   * gerando os atributos
   */
  create () {
    return {
      forca: utils.random(this.max.FORCA),
      velocidade: utils.random(this.max.VELOCIDADE),
      hp: utils.random(this.max.HP)
    }
  }
}
