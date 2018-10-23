/**
 * 
 * lIB RESPONSAVEL POR MUDAR AS TELAS / ESTAGIOS / ESTADO
 * DE UM SCENE PARA OUTRO
 * 
 * 
 */

export default class Changer {
  constructor(scenes) {
    this.scenes = scenes;
    this.current = -1;
  }

  /**
   * muda para a proxima estagio do game
   */
  next() {
    if (this.current < this.scenes.length) {
      if (this.current == -1) {
        this.scenes[this.current++].visible(true);
      } else {
        this.scenes[this.current].visible(false);
        this.scenes[this.current++].visible(true);
      }
    }
  }

  /**
   * 
   * muda paraa o estagio anterior do game
   * 
   */
  prev() {
    if (this.current > 0) {
      this.scenes[this.current].visible(false);
      this.scenes[this.current--].visible(true);
    }
  }

  /**
   * 
   * Define um salto para outra scene, mas deve ser definido as scne "from, to"
   * com base no this.scenes[array]
   * 
   */

  index(from, to) {
    this.scenes[from].visible(false);
    this.scenes[to].visible(true);
  }

  /**
   * 
   * inicia a aplicação como um game
   * 
   */
  start(lalo) {    
    const scenes = new this.scenes[0]({
      lalo: lalo
    })
    
    scenes.visible(true);

    this.current++;
  }
}
