export default class LaloContainer {
  constructor() {
    this.container = new PIXI.Container()

    // adicionando uma forma de pegar um filho de um container
    this.container.getContainer = () => this.children.filter(container => container.name === containerName)[0]
  }

  /**
   * metodo responsavel por pegar o container
   * pelo seu nome
   * 
   * @param {Object} container 
   */
  getContainer(containerName) {
    return this.container.children.filter(container => container.name === containerName)[0]
  }

  /**
   * adicionando objetos a scene
   *
   * caso seja um array ele vai inserindo todos que vem
   *
   * @param {*} object
   */
  add(object) {
    if (object instanceof Array) {
      _.forEach(object, (o) => {
        this.container.addChild(o)
      })
    } else {
      this.container.addChild(object)
    }
  }
}