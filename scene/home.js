/*
    SCENE home
*/

let home = {
    lalo: false,
    instance: (lalo) => {
        home.lalo = lalo
        return home
    },
    container: false,
    //adicionando objetos a scene
    add: (object) => {
        home.container.addChild(object)
    },
    //criando o container e adicionando no escopo global
    // e jjá definindo como invisible
    create: () => {
        //game hoall scena principal onde tem o labirinto
        home.container = new PIXI.Container()

        // create a video texture from a path
        var texture = PIXI.Texture.fromVideo('https://www.w3schools.com/html/mov_bbb.mp4');

        // create a new Sprite using the video texture (yes it's that easy)
        var videoSprite = new PIXI.Sprite(texture);

        // Stetch the fullscreen
        videoSprite.width = home.lalo.game.screen.width;
        videoSprite.height = home.lalo.game.screen.height;

        home.add(videoSprite);

        //carregando tudo qeu foi previamente gerado
        // home.graphcs()

        //adiciono no global esse container scene
        home.lalo.game.stage.addChild(home.container)

        home.container.visible = true

    },
    visible: (is) => {
        home.container.visible = is
    }

}


/*
------------------------------
SCREEN THE home
-----------------------------
*/

home.graphcs = () => {
    //Create the text sprite and add it to the `gameOver` scene
    let style = new PIXI.TextStyle({
        fontFamily: "Lobster",
        fontSize: 64,
        fill: "white",
        align: "center"
    });
    message = new PIXI.Text("Wellcome the \n Labirinty-love", style);

    message.x = ((window.innerWidth / 2) - (message.width/2));
    message.y = ((window.innerHeight / 2) - (message.height/2));


    home.add(message)

    let btn = keyboard.fisics.create(((window.innerWidth / 2) - (25/2)), (message.y + message.height + 50), 200, 50)
    btn.setText("Start", new PIXI.TextStyle({
                fontFamily: 'lobster', // Font Family
                fontSize: 22, // Font Size
                fontStyle: 'italic',// Font Style
                fontWeight: 'bold', // Font Weight
                fill: ['#ffffff', '#F8A9F9'], // gradient
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440
            }))

    btn.events(btn)

    btn.click(() => {
        changer.next()
    })

    home.add(btn.sprite)

}
