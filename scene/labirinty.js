/*
    SCENE LABIRINTY
*/

let labirinty = {
    container: false,
    //adicionando objetos a scene
    add: (object) => {
        lalo.gameScenes.labirinty.container.addChild(object)
    },
    //criando o container e adicionando no escopo global
    // e jjá definindo como invisible
    create: () => {
        //game hoall scena principal onde tem o labirinto
        lalo.gameScenes.labirinty.container = new PIXI.Container()
        //adiciono no global esse container scene
        lalo.game.stage.addChild(lalo.gameScenes.labirinty.container)

        lalo.gameScenes.labirinty.container.visible = false

    },
    visible: (is) => {
        lalo.gameScenes.labirinty.visible = is
    }

}
