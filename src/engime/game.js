export default class Game {
  constructor({...args}) {
    Object.assign(this, args)

    // intancia do game
    this.application = this.game();
  }

  game() {
    //Create a Pixi Application
    let app = new PIXI.Application({
      width: 500,
      height: "90hv",
      transparent: false
    });
  
    // Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);
  
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    // app.renderer.backgroundColor = "8D6E63";
    app.renderer.resize(window.innerWidth, window.innerHeight - 200);
  
    return app;
  }

  /**
   * 
   * adicionando objeos aa stage global 
   * 
   */
  add(container) {
    this.application.stage.addChild(container);
  }

  /**
   * metodo responsavel por pegar o container
   * pelo seu nome
   * 
   * @param {Object} container 
   */
  getContainer(containerName) {
    return this.application.stage.children.filter(container => container.name === containerName)[0]
  }
  
  /**
   * 
   * inicializando o game diacordo com a lista de senas
   * no changed do gaming
   * 
   */
  start () {    
    this.changer.start(this)
  }
}