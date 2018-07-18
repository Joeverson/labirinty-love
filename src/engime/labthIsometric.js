/**
 * a definição desse objeto é simples ele cria os obstaculos no mapa deacordo com algumas opcoes assim como
 * tamanho em x e y e o rows que é basicamente o tamanho da area do obstaciulo, no caso sera atribuido o valor quadardo do mesmo
 * assim como n², onde o ideal é que o x e uy seja o tamanho do objeto multiplicador por 4, pois será criado quadrados com base no valor x e y e preenchido as laterais
 * desses quadrados com o objeto passado mais a baixo(sprite) e o usuario andara entre os mesmos.
 *
 *
 */
import _ from 'lodash'

export default class labthIsometric {
  constructor () {
    this.width = 0
    this.height = 0
    this.rows = 0
    this.container = new PIXI.Container()
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

    /**
     *
     * desenhando o losango onde vais er a base de draw do map
     *
     */

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
      lalo.sprites.map.push(blocks)

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
      lalo.sprites.map.push(blocks)

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

    _.forEach(lalo.sprites.map, (blocks, i) => {
      if (blocks.length === 1) {
        lalo.sprites.map[i][0].x = lalo.game.renderer.screen.width / 2
        lalo.sprites.map[i][0].y = (Y * i)

        this.add(lalo.sprites.map[i][0])
      } else {
        for (var t = 0; t < blocks.length; t++) {
          if (i < this.rows) {
            if (_.isUndefined(lalo.sprites.map[i][t - 1])) { // caso seja o primeiro bloco da fila
              lalo.sprites.map[i][t].x = (lalo.sprites.map[i - 1][0].x - this.width / 2)
              lalo.sprites.map[i][t].y = (Y * i)
            } else {
              lalo.sprites.map[i][t].x = lalo.sprites.map[i][t - 1].x + this.width
              lalo.sprites.map[i][t].y = (Y * i)
            }
          } else {
            if (_.isUndefined(lalo.sprites.map[i][t - 1])) { // caso seja o primeiro bloco da fila
              lalo.sprites.map[i][t].x = (lalo.sprites.map[i - 1][0].x + this.width / 2)
              lalo.sprites.map[i][t].y = (Y * i)
            } else {
              lalo.sprites.map[i][t].x = lalo.sprites.map[i][t - 1].x + this.width
              lalo.sprites.map[i][t].y = (Y * i)
            }
          }
          //  adicionando para o container
          this.add(lalo.sprites.map[i][t])
        }
      }
    })

    // for com tamanho de cada paradinha cels
    // add positions of the em um objeto (depois ja colocar as informações do sprite wall )
    lalo.scenes.walls = this.container

    return this.container
  }
}

// this.generate(250, 250, 3)
