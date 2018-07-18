import utils from '../utils/utils'
import hp from './hp'

/*
    SCENE Monstros
*/
/**
 *
 *tenho que saber a lista de monstros-- mas são definidos por monsttos e level, força(atributos de modo geral)
 *
 *Monstros [] sprites
 *
 *Atributos {
 * força, - dano que da ao persona
 * velocidade, - valor que define quem vai dar o primeiro ataque e se vai se esquevar
 * hp - total de dano que o carinha vai aguantar
 *}
 *
 */

// value max que os atribulos podem conter

export default class Persona {
  constructor () {
    this.container = new PIXI.Container()
  }

  // adicionando objetos a scene
  add (object) {
    this.container.addChild(object)
  }

  //  passa um array de names dos sprites e a quantidade de quantos vai repetir
  create (lalo, monsters, qtdIqualsMonster) {
    return new Promise(resolve => {
      //  criando os sprites com bas no nome que foi dado a ele
      _.forEach(monsters, monster => {
        for (var i = 0; i < qtdIqualsMonster; i++) {

          // fazendo um clone do monstro para poder fazer varias copias  
          var m = PIXI.Sprite.fromImage(monster)

          //  gerando os atributos de forma aleatoria para os monstros
          //  atribuindo nova propriedade para o sprite
          m.atributos = lalo.action.attributes.generate()

          //  distribuindo na tela
          this.distribuir(lalo, m)


          resolve(this.container)

        }
      })
    })
  }

  //  criando com base num sheet de sprites
  /**
   *sheet: uma string com o caminho do sheet dos sprites
   *params: é um atributo que possue um array de objetos que possue as posições do monstro no sprite
   *ex: {
   *     x: - axis x da imagem no sprite 
   *     y: - axis y da imagem no sprite
   *     w: - width da imagem do sprite
   *     h: - height da imagem do sprite
   *}
   *
   *qtdIquaisMonster: define a quantidade de copias para cada monstro
   */
  loadSheet(lalo, sheet, params, qtdIqualsMonster) {
    let monsters = []
    let atributos
    qtdIqualsMonster = qtdIqualsMonster || 1

    return new Promise(resolve => {
      PIXI.loader
        .add('persona', sheet).load((loader, resources) => {

          /**
           *fazendo um for na quantidade de monstros que vai ter 
           *deacordo com os parametros do x e y dado pelo cliente
           *e con isso vamos pegar individualmente os sprites dentro do sheet
           *
           *apois pegar o sprite vamos aplicar a quandidade de clones em cada monstrinho 
           *usando o parametro de qtdIqualsMonster
           *
           */
          _.forEach(params, attr => {
            var mm = new PIXI.Texture(resources.persona.texture.baseTexture, 0, 0, 0, 0)
            mm.frame = new PIXI.Rectangle(attr.x, attr.y, attr.w, attr.h)

            persona.push(mm)
          })

          //  fazendo um for em cada posição qeu foi definida anterriormente
          _.forEach(persona, textureM => {

            // fazendo deacordo com a quantidade pedida
            for (var i = 0; i < qtdIqualsMonster; i++) {
              //  pegando os frame do sheet para remover só o spŕite do monstro
              var m = new PIXI.Sprite(textureM)

              // almentando os mesmos
              m.scale.x *= 2
              m.scale.y *= 2

              /*
                  gerando os atributos de forma aleatoria para os monstros
                  atribuindo nova propriedade para o sprite
              */
              m.atributos = lalo.action.attributes.generate()

              //  colocando a barra de life no monstro
              hp.bar(m)

              //  debug
              utils.debug.sprite(m)

              // dsitribuindo
              this.distribuir(lalo, m)

            }

          })

          // returnn promisse
          resolve(this.container)
        })
    })
  }

  /**
   *
   *Methodo define a distibuição dos monstros em torno do mapa
   *onde vamos definir quantos voce quer epalhados por ai
   *e tals
   *
   */
  distribuir(lalo, persona) {
    let w = lalo.game.renderer.screen.width
    let h = lalo.game.renderer.screen.height


    //  // definindo um lugar a leatorio para o monstro
    persona.x = utils.random(w)
    persona.y = utils.random(h)

    // adicionando no container
    this.add(persona)

    // salvando no sprites global 
    lalo.sprites.monsters.push(persona)

  }

  visible(is) {
    this.container.visible = is
  }

  /**
   *
   *moveload é um metodo re permite que vc movimente o personagem 
   *com os controles, vc passa as coordenadas do sprite que sera
   *alterado ao se mover
   *
   *lalo = object game
   *sheet = folha de estilo onde esta o sprite do persona
   *coords = coordenadas do persona para as movimentações, seguindo o padrão do animations.js
   *size = tamanho em pixel do personagem
   */

  moveload(lalo, sheet, coords, size) {
    return new Promise(resolve => {
      PIXI.loader
        .add('person', sheet).load((loader, resources) => {

          // preparando o person
          resources.person.texture.frame = lalo.action.animation.move.load(coords, size).default

          const persona = new PIXI.Sprite(resources.person.texture)

          /*
            gerando os atributos de forma aleatoria para os monstros
            atribuindo nova propriedade para o sprite
          */
          persona.atributos = lalo.action.attributes.generate()

          // atribuindo ao lalo as sprites para serem usdas em qualquer lugar

          persona.vx = 0
          persona.vy = 0

          persona.x = window.innerWidth / 2
          persona.y = window.innerHeight / 2

          //  vinculando o persona a raiz do game
          lalo.sprites.persona = persona

          resolve(lalo.sprites.persona)
        })
    })
  }

}
