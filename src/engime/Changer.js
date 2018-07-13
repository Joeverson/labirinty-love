/**
 * 
 * lIB RESPONSAVEL POR MUDAR AS TELAS / ESTAGIOS / ESTADO
 * DE UM SCENE PARA OUTRO
 * 
 * 
 */

export default class Changer {
  constructor(gameScenes) {
    this.scenes = this.scanScenes(gameScenes);
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
  start(lalo, scene = false) {
    // create all scenes
    _.forEach(this.scenes, element => {
      let scene = element;

      scene.create(lalo);
    });

    //show scene init
    if (scene) {
      scene.visible(true);
      this.scenes[current].visible(false);
    } else {
      this.scenes[0].visible(true);
      this.current++;
    }
  }

  /**
   * 
   * get the scenes alreay registed
   * 
   */
  scanScenes(gameScenes) {
    const scenes = [];

    Object.keys(gameScenes).forEach(function (key) {
      scenes.push(gameScenes[key]);
    });

    return scenes;
  }
}
