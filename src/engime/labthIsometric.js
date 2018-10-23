/**
 * a definição desse objeto é simples ele cria os obstaculos no mapa deacordo com algumas opcoes assim como
 * tamanho em x e y e o rows que é basicamente o tamanho da area do obstaciulo, no caso sera atribuido o valor quadardo do mesmo
 * assim como n², onde o ideal é que o x e uy seja o tamanho do objeto multiplicador por 4, pois será criado quadrados com base no valor x e y e preenchido as laterais
 * desses quadrados com o objeto passado mais a baixo(sprite) e o usuario andara entre os mesmos.
 *
 *
 */
import _ from 'lodash'
import utils from '../utils/utils';

class LabthIsometric {
  constructor () {
    this.width = 0
    this.height = 0
    this.rows = 0
    this.container = new PIXI.Container()
    this.container.name = 'walls'

    this.map = []
  }

  add (sprite) {
    this.container.addChild(sprite)
  }

  generate (lalo, width, height, rows, sprites) {
    this.width = width // rows of the section []
    this.height = height // rows of the section []
    this.rows = rows // tamanho do labirinto tamanho exponencial - quantidade de blocos que iram ser utilizados para montar o map
    // let blocks = []
    let cells = 0

    // definindo base de objeto e lista de imagens para as paredes do labirinto
    // let o = []
    let sprite = sprites || {
      top: 'src/sprites/Isometric/cactus_short_NW.png',
      right: 'src/sprites/Isometric/cactus_short_SW.png',
      bottom: 'src/sprites/Isometric/cactus_short_NE.png',
      left: 'src/sprites/Isometric/cactus_short_SE.png'
    }

    // definindo a primeiro parte do map
    const plus = this.addBlocksPlus(lalo, rows, cells, sprite)

    // desenhando a segunda parte do map
    this.addBlocksLess(lalo, rows, plus.cells, sprite)
    
    // organizando os blocos no map para apresentar no render
    return this.organizeBlocks(lalo)
  }

  addBlocksPlus (lalo, rows, cells, sprite) {
    let blocks = []
    // adicionando os blocos necessarios para montar o map no array do map em sprites de forma positiva
    for (var i = 0; i < rows; i++) {
      // quantidade de blocos por linha
      cells++

      for (var t = 0; t < cells; t++) {
        // create a new Sprite from an image path
        blocks.push(PIXI.Sprite.fromImage(sprite.top))
      }

      // blocks.reverse()

      // definindo a paradinha para a parede
      this.map.push(blocks)

      // clean the blocs
      blocks = []
    }

    return {
      cells
    }
  }

  addBlocksLess (lalo, rows, cells, sprite) {
    let blocks = []
    // adicionando os blocos necessarios para montar o map no array do map em sprites de forma positiva
    for (var i = 0; i < (rows - 1); i++) {
      // quantidade de blocos por linha
      cells--

      for (var t = 0; t < cells; t++) {
        // create a new Sprite from an image path
        blocks.push(PIXI.Sprite.fromImage(sprite.top))
      }
      // blocks.reverse()

      // definindo a paradinha para a parede
      this.map.push(blocks)

      // clean the blocs
      blocks = []
    }

    return {
      cells
    }
  }

  organizeBlocks (lalo) {
    const Y = 53
    // calculo para  primeiro bloco
    // g.sprites.walls[0].x = g.game.renderer.screen.width / 2
    // altura ideal para o proximo bloco: y = 54px

    // segundo bloco deve ter essa configuração e ir exponencialmente calculando o valor de x de acordo com os dados de rows
    // g.sprites.walls[1].x = (g.game.renderer.screen.width/2) - (g.sprites.walls[0].width / 2)

    // invertrendo a insersção dos blocos do array
    // lalo.sprites.map.reverse()

    _.forEach(this.map, (blocks, i) => {
      if (blocks.length === 1) {
        this.map[i][0].x = lalo.application.renderer.screen.width / 2
        this.map[i][0].y = (Y * i)

        this.add(this.map[i][0])
      } else {
        for (var t = 0; t < blocks.length; t++) {
          if (i < this.rows) {
            if (_.isUndefined(this.map[i][t - 1])) { // caso seja o primeiro bloco da fila
              this.map[i][t].x = (this.map[i - 1][0].x - this.width / 2)
              this.map[i][t].y = (Y * i)
            } else {
              this.map[i][t].x = this.map[i][t - 1].x + this.width
              this.map[i][t].y = (Y * i)
            }
          } else {
            if (_.isUndefined(this.map[i][t - 1])) { // caso seja o primeiro bloco da fila
              this.map[i][t].x = (this.map[i - 1][0].x + this.width / 2)
              this.map[i][t].y = (Y * i)
            } else {
              this.map[i][t].x = this.map[i][t - 1].x + this.width
              this.map[i][t].y = (Y * i)
            }
          }
          //  adicionando para o container
          this.add(this.map[i][t])
        }
      }
    })

    // for com tamanho de cada paradinha cels
    // add positions of the em um objeto (depois ja colocar as informações do sprite wall )
    lalo.getContainer('labirinth').addChild(this.container)

    this.spreadThings(35)

    return this.container
  }

  /**
   * espalhando itens pelo mapa
   * vc passa a porcentagem do espaço que vai ser populado
   * 
   * @param {Int} percent
   */
  spreadThings(percent) {
    const itens = [
      'src/sprites/Isometric/flower_red3_NW.png',
      'src/sprites/Isometric/log_small_SW.png',
      'src/sprites/Isometric/logs_stack_NW.png',
      'src/sprites/Isometric/plant_bush_NW.png',
      'src/sprites/Isometric/rock_tall2_NW.png',
      'src/sprites/Isometric/tent_detailedOpen_SE.png',
      'src/sprites/Isometric/tree_pine_shortSquare_detailed_NE.png',
      'src/sprites/Isometric/tree_pine_shortSquare_detailed_NW.png',
      'src/sprites/Isometric/tree_pine_shortSquare_detailed_SE.png',
    ]

    const countContainer = this.container.children.length
    percent = (percent / 100)

    /**
     * fazendo o calculo para poder 
     * saber qual e a quantidade de acordo
     * com a porcentagem informada
     */
    for(var x = 0; x < (percent * countContainer); x++) {
      var wall = this.container.children[utils.random(countContainer)];
      var item = PIXI.Sprite.fromImage(itens[utils.random(itens.length)])

      // posição do x e y com base no width e heigt do chão onde ele sta
      item.x = 45.5
      item.y = 0
      
      wall.addChild(item)
    }
  }
}

export default new LabthIsometric()
