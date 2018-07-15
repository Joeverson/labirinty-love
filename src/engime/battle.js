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
  fight(lalo, {...sprites}) {
    this.lalo = lalo;
    const persona = sprites.persona;
    const monster = sprites.monster;
    
    console.log(lalo);
    
    // açaõ de atacar o oponente
    this.attack(persona, monster);
    
    console.log(persona.atributos, monster.atributos);
  },
  /**
   * atack dos personagens 
   * 
   * @param {*} persona 
   * @param {*} monster 
   */
  attack(persona, monster) {
    const p = persona.atributos;
    const m = monster.atributos;

    /**
     * aquele que tem maior velocidade é quem ataca 
     * primeiro
     */
    if (m.velocidade > p.velocidade) {
      this.damage(persona, m.forca);      

      // miss attack
      if (utils.random(m.velocidade * 3) < m.velocidade) {        
        this.damage(monster, p.forca);
      } else {
        console.log('miss monster');
      }
    } else {
      this.damage(monster, p.forca);

      // miss attack
      if (utils.random(m.velocidade * 3) < m.velocidade) {
        this.damage(persona, m.forca);
      } else {
        console.log('miss you');
      }
    }
  },
  
  /**
   * representação de dano do personagem
   * 
   * @param {*} sprite 
   * @param {int} damage 
   */
  damage(sprite, damage) {
    if (sprite.atributos.hp > 0) {
      // diminuindo o hp nos atributos
      sprite.atributos.hp -= damage;
      
      if ((sprite.atributos.hp - damage) > 0){
        // diminuindo o hp visualmente no game
        sprite.children[0].width -= utils.hpBarPorcent(sprite.atributos.hp, damage, sprite.children[0].width);
      } else {
        this.die(sprite);
      }
    }    
  },

  /**
   * die é um metodo que mata o persona 
   * basicamento faxz ele sumir e dar atributos ao persona
   * 
   */
  die(sprite) {
    // faz com qeu o bixo suma
    sprite.visible = false;
    // sprite.destroy();
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
