/*
-----------------
gameing pre base
-----------------
*/
export default class Game {
  constructor({...args}) {
    args.game = this.app();
    args.add = this.add;

    return args;
  }

  app() {
    //Create a Pixi Application
    let app = new PIXI.Application({
      width: 500,
      height: "90hv",
      transparent: false
    });
  
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);
  
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.backgroundColor = "8D6E63";
    app.renderer.resize(window.innerWidth, window.innerHeight - 200);
  
    return app;
  }

  /**
   * 
   * adicionando objeos aa stage global 
   * 
   */
  add(container) {
    this.game.stage.addChild(container);
  }
  
}