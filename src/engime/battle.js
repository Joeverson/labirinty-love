import utils from "../utils/utils";

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
  attack({ ...sprites
  }) {
    const p = sprites.persona.atributos;
    const m = sprites.monster.atributos;

    // aquele que tiver maior velocidade ataca primeiro
    if (m.velocidade > p.velocidade) {
      p.hp = (p.hp - m.forca);

      // miss attack
      if (utils.random(velocidade) < m.velocidade) {
        m.hp = (m.hp - p.forca);
      }
    } else {      
      m.hp = (m.hp - p.forca);
      
      // miss attack
      if (utils.random(velocidade) < m.velocidade) {
        m.hp = (m.hp - p.forca);
      }
    }

    console.log(p, m);
  },
  /**
   * Fazendo um zoom no personagem durante uma batalha
   * 
   */
  zoom: () => {
    // fazendo o zook no ambiente
    this.a.lalo.game.stage.scale.x = 2;
    this.a.lalo.game.stage.scale.y = 2;

    //deixando o zoom no personagem
    this.a.lalo.game.stage.x = (-1 * (this.a.lalo.sprites.persona.x));
    this.a.lalo.game.stage.y = (-1 * (this.a.lalo.sprites.persona.y));
  }
}
