/*
    SCENE interface
*/


export default {
    lalo: false,
    instance: (lalo) => {
        interface.lalo = lalo
        return interface
    },
    container: false,
    //adicionando objetos a scene
    add: (object) => {
        interface.container.addChild(object)
    },
    //criando o container e adicionando no escopo global
    // e jjá definindo como invisible
    create: () => {
        //game hoall scena principal onde tem o labirinto
        interface.container = new PIXI.Container()

        // create a video texture from a path
        var texture = PIXI.Texture.fromVideo('src/videos/init-logo.mp4');
        // create a new Sprite using the video texture (yes it's that easy)
        var videoSprite = new PIXI.Sprite(texture);

        // Stetch the fullscreen
        videoSprite.width = window.innerWidth
        videoSprite.height = window.innerHeight

        interface.add(videoSprite);

        //adiciono no global esse container scene
        interface.lalo.add(interface.container)

        interface.container.visible = false

    },
    visible: (is) => {
        interface.container.visible = is
    }

}