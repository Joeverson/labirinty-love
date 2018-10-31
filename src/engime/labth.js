import utils from "../utils/utils";


/**
 * a definição desse objeto é simples ele cria os obstaculos no mapa deacordo com algumas opcoes assim como 
 * tamanho em x e y e o size que é basicamente o tamanho da area do obstaciulo, no caso sera atribuido o valor quadardo do mesmo
 * assim como n², onde o ideal é que o x e uy seja o tamanho do objeto multiplicador por 4, pois será criado quadrados com base no valor x e y e preenchido as laterais
 * desses quadrados com o objeto passado mais a baixo(sprite) e o usuario andara entre os mesmos. 
 * 
 * 
 */
const TOP = 0,
  RIGHT = 1,
  BOTTOM = 2,
  LEFT = 3

class Labth {
  constructor() {
    this.x = 0
    this.y = 0
    this.size = 0
    
    const container = new PIXI.Container()
    container.name = 'walls';

    this.container = container    
  }

  add(sprite) {
    this.container.addChild(sprite)
  }

  generate(lalo, x, y, size, sprites) {
    this.x = x // size of the section []
    this.y = y // size of the section []
    this.size = size // tamanho do labirinto tamanho exponencial - quantidade de blocos para row and column

    // definindo base de objeto e lista de imagens para as paredes do labirinto    
    const sprite = sprites || {
      top: 'src/sprites/Isometric/cactus_short_NW.png',
      right: 'src/sprites/Isometric/cactus_short_SW.png',
      bottom: 'src/sprites/Isometric/cactus_short_NE.png',
      left: 'src/sprites/Isometric/cactus_short_SE.png',
    }

    const walls = []

    //for com tamanho de cada paradinha row
    for (var i = 0; i < size; i++) {
      for (var c = 0; c < size; c++) {
        // create a new Sprite from an image path
        var wall, coor

        switch (utils.random(4)) {
          case TOP:
            wall = PIXI.Sprite.fromImage(sprite.top)
            coor = this.top(i, c, wall)
            wall.x = coor.x
            wall.y = coor.y
            break;
          case RIGHT:
            wall = PIXI.Sprite.fromImage(sprite.right)
            coor = this.right(i, c, wall)
            wall.x = coor.x
            wall.y = coor.y
            break;
          case BOTTOM:
            wall = PIXI.Sprite.fromImage(sprite.bottom)
            coor = this.bottom(i, c, wall)
            wall.x = coor.x
            wall.y = coor.y
            break;
          case LEFT:
            wall = PIXI.Sprite.fromImage(sprite.left)
            coor = this.left(i, c, wall)
            wall.x = coor.x
            wall.y = coor.y
            break;
        }

        //adicionando para o container
        this.add(wall)
      }
    }

    // add positions of the em um objeto (depois ja colocar as informações do sprite wall )
    lalo.getContainer('labirinth').addChild(this.container)
  }

  // item no lado esquerdo
  left(row, cell, sprite) {
    return {
      row,
      cell,
      x: (cell * this.x) + sprite.width,
      y: (row * this.y) + sprite.height
    }
  }

  //item no lado direito
  right(row, cell, sprite) {
    return {
      row,
      cell,
      x: ((cell * this.x) + this.x) - sprite.width,
      y: (row * this.y) + sprite.height
    }
  }

  //item na parte de baixo
  bottom(row, cell, sprite) {
    return {
      row,
      cell,
      x: (cell * this.x) - sprite.width,
      y: ((row * this.y) + this.y) - sprite.height
    }
  }

  //item na parte de cima
  top(row, cell, sprite) {
    return {
      row,
      cell,
      x: ((cell * this.x) + this.x) - sprite.width,
      y: (row * this.y) - sprite.height
    }
  }
}

export default new Labth()