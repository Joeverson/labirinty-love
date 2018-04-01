import * as PIXI from 'pixi.js'
import * as animation from './engime/animation'
import collision from './engime/collision'
import joystick from './engime/keyboard'
import sounds from './engime/sounds'

console.log(animation);



/*
-----------------
gameing pre base
-----------------
*/
let game = {}

game.init = () => {
    //Create a Pixi Application
    let app = new PIXI.Application({
        width: 500,
        height: 500,
        transparent: false
    });

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    return app
}

/*
-----------------
gameing instance
-----------------
*/

let lalo = {}
//instanciando o game
lalo.game = game.init()

//carregando o objeto para controllers
lalo.joystick = joystick

//instanciando as colisões
lalo.collision = collision

// preparando o move parts person, onde é responsavel pela animações de sprite andnada
lalo.animation = animation


/*
-----------------
sprites
-----------------
*/
lalo.sprites = {}


/*
-----------------
containers gameScenes
-----------------
*/
lalo.gameScenes = {
    labirinty,
    init
}


/*
-----------------
state looping
definição de que loopin será chamado para executar
-----------------
*/
lalo.state = ""

/*
-----------------
load and cache sprites
-----------------
*/

lalo.loads = callback => {
    // load the texture we need
    PIXI.loader
        .add('objects', 'sprites/878773e1bbd2db4dda551f29039b6ee3-d6qwisk.png')
        .add('person', 'sprites/878773e1bbd2db4dda551f29039b6ee3-d6qwisk.png').load((loader, resources) => {

            //preparando o person
            resources.person.texture.frame = lalo.animation.move.load({
                left: [{
                        x: 594,
                        y: 54
                    },
                    {
                        x: 626,
                        y: 56
                    },
                    {
                        x: 658,
                        y: 54
                    },
                    {
                        x: 690,
                        y: 56
                    },
                ],
                up: [
                    {
                        x: 594,
                        y: 150
                    },
                    {
                        x: 626,
                        y: 152
                    },
                    {
                        x: 658,
                        y: 150
                    },
                    {
                        x: 690,
                        y: 152
                    }
                ],
                right: [
                    {
                        x: 594,
                        y: 102
                    },
                    {
                        x: 626,
                        y: 104
                    },
                    {
                        x: 658,
                        y: 102
                    },
                    {
                        x: 690,
                        y: 104
                    }
                ],
                down: [
                    {
                        x: 594,
                        y: 6
                    },
                    {
                        x: 626,
                        y: 8
                    },
                    {
                        x: 658,
                        y: 6
                    },
                    {
                        x: 690,
                        y: 8
                    },
                ]
            }, {
                w: 28,
                h: 38
            }).default

            let persona = new PIXI.Sprite(resources.person.texture);

            // persona.interactive = true
            // persona.buttonMode = true

            //atribuindo ao lalo as sprites para serem usdas em qualquer lugar
            lalo.sprites.persona = persona

            lalo.sprites.persona.vx = 0
            lalo.sprites.persona.vy = 0


            //definindo quem vai tratar o looping
            lalo.state = personRunner

            lalo.game.ticker.add(delta => lalo.gameLoop(delta));


            lalo.joystick(lalo.sprites.persona)

            callback()
        });
}

/*
------------------------------
game looping
------------------------------
*/
lalo.gameLoop = delta => {
   lalo.state(delta)
}

// looping responsavel por m,ovimentar o persona
function personRunner () {
    // if(!lalo.collision(lalo.sprites.carinha, lalo.sprites.pirata)){
    //Use the cat's velocity to make it move
    lalo.sprites.persona.x += lalo.sprites.persona.vx;

    lalo.sprites.persona.y += lalo.sprites.persona.vy
    // }
}


/*
-----------------
Run
-----------------
*/
lalo.loads(() => {


    //game hoall scena principal onde tem o labirinto
    lalo.gameScenes.labirinty = new PIXI.Container()
    lalo.gameScenes.labirinty.addChild(lalo.sprites.persona)


    lalo.game.stage.addChild(lalo.gameScenes.labirinty)

    lalo.gameScenes.labirinty.visible = false

    //splash screen
    lalo.gameScenes.splash = new PIXI.Container()
    lalo.game.stage.addChild(lalo.gameScenes.splash)


    //Create the text sprite and add it to the `gameOver` scene
    let style = new PIXI.TextStyle({
        fontFamily: "Futura",
        fontSize: 64,
        fill: "white"
    });
    message = new PIXI.Text("The End!", style);
    message.x = 120;
    message.y = lalo.game.height / 2 - 32;
    lalo.gameScenes.splash.addChild(message)
})
