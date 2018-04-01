/*
    SCENE LABIRINTY
*/

let labirinty = {
    lalo: false,
    instance: (lalo) => {
        labirinty.lalo = lalo
        return labirinty
    },
    container: false,
    //state looping - definição de que loopin será chamado para executar
    state: "",
    //adicionando objetos a scene
    add: (object) => {
        labirinty.container.addChild(object)
    },
    //criando o container e adicionando no escopo global
    // e jjá definindo como invisible
    create: () => {
        //instanciando tudo dentro do container
        labirinty.loads((objects) => {
            //game hoall scena principal onde tem o labirinto
            labirinty.container = new PIXI.Container()

            //add objects ao container
            _.forEach(objects, o => {
                labirinty.add(o)
            })

            //add the joystick for one personagem
            labirinty.lalo.joystick(lalo.sprites.persona)

            //adiciono no global esse container scene
            labirinty.lalo.game.stage.addChild(labirinty.container)

            //add visible container default
            labirinty.lalo.gameScenes.labirinty.container.visible = false
        })
    },
    visible: (is) => {
        labirinty.container.visible = is
    }

}



/*
-----------------
load and cache sprites
-----------------
*/

labirinty.loads = callback => {
    // load the texture we need
    PIXI.loader
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
            labirinty.lalo.sprites.persona = persona

            labirinty.lalo.sprites.persona.vx = 0
            labirinty.lalo.sprites.persona.vy = 0


            //definindo quem vai tratar o looping
            labirinty.state = personRunner

            labirinty.lalo.game.ticker.add(delta => labirinty.gameLoop(delta));

            callback([labirinty.lalo.sprites.persona])
        });
}

/*
------------------------------
game looping
------------------------------
*/
labirinty.gameLoop = delta => {
   labirinty.state(delta)
}


/*
------------------------------
funcitons game looping
------------------------------
*/

// looping responsavel por m,ovimentar o persona
function personRunner () {
    // if(!lalo.collision(lalo.sprites.carinha, lalo.sprites.pirata)){
    //Use the cat's velocity to make it move
    labirinty.lalo.sprites.persona.x += labirinty.lalo.sprites.persona.vx;

    labirinty.lalo.sprites.persona.y += labirinty.lalo.sprites.persona.vy
    // }
}
