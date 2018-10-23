/*
-----------------
esse é um objeto que vai auxiliar na
alteração de sprites durante o movimento do
personagem, ele recebe algumas informações no load
pixels: tamanho em pixo da imagem 16x16 or 32x32, no caso deve ser um json com {w: 000, h: 000} definindo o tamanho do sprite...
positions: deve ser um json com { left: {x:0, y:0}, right: {x:0, y:10}}
dentro de positions pode ser haver um array de posições qeu iram simular uma animação no personagem e forma mais legal e interessante
no caso segue o exemplo
{
    left: [
        {
            x:00,
            y:585
        },
        {
            x:100,
            y:585
        }
    ],
    up: [
        {
            x:00,
            y:585
        },
        {
            x:100,
            y:585
        }
    ],
    ...
}
-----------------
*/
const directions = {
  left: () => move.frame('left'),
  up: () => move.frame('up'),
  down: () => move.frame('down'),
  right: () => move.frame('right')
}

const move = {
  positions: {},
  pixels: {},
  stage: { // passo corrente da animação
    left: -1,
    up: -1,
    down: -1,
    right: -1
  },
  load(positions, pixels) {    
    //atribuindo as posições num escopo maior
    this.positions = positions;

    //definindo tamanhos default para sprite
    this.pixels = pixels;
    
    return {
      default: this.frame('down'),
      left: this.frame('left'),
      up: this.frame('up'),
      down: this.frame('down'),
      right: this.frame('right')
    }
  },
  frame(way) {
    //sounds
    // PIXI.sound.play('steps')

    //condicional de posições dde persona onde fica as coisa
    if (_.isArray(this.positions[way])) {
      //verifica qual animação chamar / se for maior que o total de posições ele zera, caso seja menor ele ++
      if (this.stage[way] < (this.positions[way].length - 1)) {
        this.stage[way]++
      } else {
        this.stage[way] = 0;
      }

      //pegando as informações para a geração do frame
      let frame = this.positions[way][this.stage[way]]

      //criando o frame para alteração
      return new PIXI.Rectangle(frame.x, frame.y, this.pixels.w, this.pixels.h)

    } else {
      //criando o frame para alteração
      return new PIXI.Rectangle(this.positions[way].x, this.positions[way].y, this.pixels.w, this.pixels.h)
    }
  }
}

export default {
  move,
  directions
}
