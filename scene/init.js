/*
    SCENE init
*/

let init = {
    container: false,
    //adicionando objetos a scene
    add: (object) => {
        lalo.gameScenes.init.container.addChild(object)
    },
    //criando o container e adicionando no escopo global
    // e jjá definindo como invisible
    create: () => {
        //game hoall scena principal onde tem o labirinto
        lalo.gameScenes.init.container = new PIXI.Container()
        //adiciono no global esse container scene
        lalo.game.stage.addChild(lalo.gameScenes.init.container)

        lalo.gameScenes.init.container.visible = false

    },
    visible: (is) => {
        lalo.gameScenes.init.visible = is
    }

}


/*
------------------------------
SCREEN THE INIT
-----------------------------
*/

//Create the text sprite and add it to the `gameOver` scene
let style = new PIXI.TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
});
message = new PIXI.Text("Wellcome the Labirinty-love", style);
message.x = 120;
message.y = lalo.game.height / 2 - 32;
lalo.gameScenes.splash.addChild(message)
