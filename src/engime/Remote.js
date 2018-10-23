import io from 'socket.io-client/lib';


/**
 * 
 * remote controls
 * 
 * usado para poder usar controle remoto
 * para poder controlar o personagem
 * 
 * 
 */
const REMOTE = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};

const VELOCITY_PERSONA = 3;


class Remote {
  constructor() {
    const socket = io('http://10.0.60.142:3000')
    
    // verificando as requisições do remoto
    socket.on('commands', (msg) => {
      this.move(msg);
    });
  }

  sprite(sprite) {
    this.sprite = sprite;
  }

  move({...args}) {
    console.log(args);
    
    const pos = args.pos;
    const velocity = args.velocity;
    const sprite = this.sprite

    // a sprite demora pra ser instanciada e o jogo buga se tirar esssa validaçaõ aqui
    if (sprite == undefined) {
      console.log('sprite ainda não instanciada');
    } else if (pos == null) {
      sprite.vx = 0;
      sprite.vy = 0;
    } else if (pos === REMOTE.LEFT) {
      sprite.vx = -VELOCITY_PERSONA + ((velocity / 10));
      sprite.vy = 0;
      sprite.texture.frame = animation.directions.left()
  
    } else if (pos === REMOTE.RIGHT) {
      sprite.vx = VELOCITY_PERSONA + (Math.abs(velocity) / 10);
      sprite.vy = 0;
  
      sprite.texture.frame = animation.directions.right()
    } else if (pos === REMOTE.UP) {
      sprite.vy = -VELOCITY_PERSONA + ((velocity / 10) * -1);
      sprite.vx = 0;
  
      sprite.texture.frame = animation.directions.up()
    } else if (pos === REMOTE.DOWN) {
      sprite.vy = VELOCITY_PERSONA + (Math.abs(velocity) / 10);
      sprite.vx = 0;
  
      sprite.texture.frame = animation.directions.down()
    }
  }
}

export default new Remote()

