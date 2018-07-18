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
const move =  {
  positions: {},
  pixels: {},
  stage: { // passo corrente da animação
    left: -1,
    up: -1,
    down: -1,
    right: -1
  },
  directions: {
    left: () => {
      return move.frame("left")
    },
    up: () => {
      return move.frame("up")
    },
    down: () => {
      return move.frame("down")
    },
    right: () => {
      return move.frame("right")
    }
  },
  load: (positions, pixels) => {
    //atribuindo as posições num escopo maior
    move.positions = positions;

    //definindo tamanhos default para sprite
    move.pixels = pixels;

    return {
      default: move.directions.down(),
      left: move.directions.left(),
      up: move.directions.up(),
      down: move.directions.down(),
      right: move.directions.right()
    }
  },
  frame: way => {
    //sounds
    // PIXI.sound.play('steps')

    //condicional de posições dde persona onde fica as coisa
    if (_.isArray(move.positions[way])) {
      //verifica qual animação chamar / se for maior que o total de posições ele zera, caso seja menor ele ++
      if (move.stage[way] < (move.positions[way].length - 1)) {
        move.stage[way]++
      } else {
        move.stage[way] = 0;
      }

      //pegando as informações para a geração do frame
      let frame = move.positions[way][move.stage[way]]

      //criando o frame para alteração
      return new PIXI.Rectangle(frame.x, frame.y, move.pixels.w, move.pixels.h)

    } else {
      //criando o frame para alteração
      return new PIXI.Rectangle(move.positions[way].x, move.positions[way].y, move.pixels.w, move.pixels.h)
    }
  }
}


export {
  move
}