/*
    SCENE movie
*/

let movie = {
    lalo: false,
    instance: (lalo) => {        
        movie.lalo = lalo
        return movie
    },
    container: new PIXI.Container(),
    //adicionando objetos a scene
    add: (object) => {
        movie.container.addChild(object)
    },
    //criando o container e adicionando no escopo global
    // e jjá definindo como invisible
    create: () => {
        
        // create a video texture from a path
        var texture = PIXI.Texture.fromVideo('src/videos/init-logo.mp4');
        // create a new Sprite using the video texture (yes it's that easy)
        var videoSprite = new PIXI.Sprite(texture);

        // Stetch the fullscreen
        videoSprite.width = window.innerWidth
        videoSprite.height = window.innerHeight

        movie.add(videoSprite);

        //adiciono no global esse container scene
        movie.lalo.add(movie.container)

        movie.container.visible = false

    },
    visible: (is) => {
        movie.container.visible = is
    }

}

export default movie