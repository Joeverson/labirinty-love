import { joystick, joystickMoveContainer, commands } from "../engime/keyboard";
import labth from "../engime/labth";
import { collision, contain, moveMap } from "../engime/collision";
import monsters from "../engime/monsters";
import utils from "../utils/utils"
import battle from "../engime/battle";
import hp from "../engime/hp";
/*
    SCENE LABIRINTY
*/

let labirinty = {
    lalo: false,
    instance: (lalo) => {
        labirinty.lalo = lalo
        return labirinty
    },
    container: new PIXI.Container(),
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

            //add objects ao container
            _.forEach(objects, o => {
                labirinty.add(o)
            })

            //add the joystick for one personagem
            joystick(labirinty.lalo.sprites.persona)

            //adiciono no global esse container scene
            labirinty.lalo.add(labirinty.container)

            utils.debug.sprite(labirinty.lalo.sprites.persona)

            /***
             * 
             * Criando o labirinto
             * 
             * */
            labth.instance(labirinty.lalo)
            labth.generate(133, 133, 30, {
                left: "src/sprites/Isometric/fence_diagonal_NW.png",
                right: "src/sprites/Isometric/fence_diagonal_NW.png",
                top: "src/sprites/Isometric/fence_diagonal_SE.png",
                bottom: "src/sprites/Isometric/fence_diagonal_SE.png"
            })


            /**
             * 
             * Criando os monstros
             * 
             */
            // prepara a instancia para os monstros
            monsters.instance(labirinty.lalo)

            //cria os monstros na memoria
            monsters.loadSheet('src/sprites/0x72_16x16DungeonTileset.v4.png', [
                { // #1 monstro
                    x: 133,
                    y: 178,
                    w: 22,
                    h: 30
                },
                {// #2 monstro
                    x: 102,
                    y: 182,
                    w: 20,
                    h: 26
                },
                {// #3 monstro
                    x: 160,
                    y: 177,
                    w: 32,
                    h: 31
                }
            ], 5).then(container => {
                // adicionando ao container do labirinto
                labirinty.add(container)
            })

            /***
             * 
             * escutando os comandos disparados pelos jogador
             * 
             * */
            commands.listen(labirinty.lalo)

            /**
             * 
             * deixando esse container visivel
             * 
             */
            labirinty.container.visible = true
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
        .add('person', 'src/sprites/878773e1bbd2db4dda551f29039b6ee3-d6qwisk.png').load((loader, resources) => {

            //preparando o person
            resources.person.texture.frame = labirinty.lalo.animation.move.load({
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

            labirinty.lalo.sprites.persona.x = window.innerWidth / 2
            labirinty.lalo.sprites.persona.y = window.innerHeight / 2

            //colocando a barra de vida
            hp.bar(labirinty.lalo.sprites.persona)

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
function personRunner() {
    //Use the cat's velocity to make it move
    labirinty.lalo.sprites.persona.x += labirinty.lalo.sprites.persona.vx;

    labirinty.lalo.sprites.persona.y += labirinty.lalo.sprites.persona.vy

    /**
     * colisão quando o persona tenta passar pelas paredes
     * esse foreache verifica se ele esta batendo em algum 
     * dos obstaculos e o contain faz uma contenção para que ele não atravese 
     */
    _.forEach(labirinty.lalo.sprites.walls, wall => {
        if (collision(wall, labirinty.lalo.sprites.persona)) {
            contain(labirinty.lalo.sprites.persona, wall)
        }
    })

    /**
     * 
     * verificando se o persona bate em algum monstro
     * e com isso ele da um zoom e começa a batalha
     * 
     * 
     */
    _.forEach(labirinty.lalo.sprites.monsters, monster => {
        if (collision(monster, labirinty.lalo.sprites.persona)) {
            contain(labirinty.lalo.sprites.persona, monster)
            battle.fight(labirinty.lalo)
        }
    })


    /**
     * 
     * instanciando o move map
     * 
     */
    
    moveMap.move(200, 10, labirinty.lalo.game, labirinty.lalo.sprites.persona)
    

}


//floor
function floor_render() {
    let texture = PIXI.Texture.fromImage('img/sprites/floor.png')
    var sprite

    let loopw = Math.floor(window.innerWidth / texture.width)
    let looph = Math.floor(window.innerHeight / texture.height)

    // for(var h=0; h<looph; h++){


    //     for(var i=0; i<loopw; i++){

    //         sprite = new PIXI.Sprite(texture)

    //         sprite.x = sprite.x+i
    //         sprite.y = sprite.y+h    


    //         labirinty.add(sprite)
    //     }
    // }
}

/**
 * 
 *  EXPORTS
 * 
* **/

export default labirinty