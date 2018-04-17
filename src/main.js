import {keyboard, joystick, commands} from  './engime/keyboard'
import animation from  './engime/animation'
// var labth = require('./js/engime/labth')
import { collision } from  './engime/collision'
import changer from  './engime/changer'
import labth from  './engime/labth'


/**
 * SCENES
 * 
 * **/
import home from  './scene/home'
import movie from  './scene/movie'
import labirinty from  './scene/labirinty'

/*
-----------------
gameing pre base
-----------------
*/
function init (){
    //Create a Pixi Application
    let app = new PIXI.Application({
        width: 500,
        height: 500,
        transparent: true
    });

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.backgroundColor = "#8D6E63";
    app.renderer.resize(window.innerWidth, window.innerHeight-200);

    return app
}

/*
-----------------
gameing instance
-----------------
*/

//construct
let lalo = {
    //instanciando o game
    game: init(),    
    //carregando o objeto para controllers
    joystick: keyboard.joystick,
    keyboard: keyboard.keyboard,
    //instanciando as colisões
    collision,
    // preparando o move parts person, onde é responsavel pela animações de sprite andnada
    animation,
    //gerando labirintys
    labth,
    //storage ofthe sprites
    sprites: {
        walls: []
    },       
    //alterador de telas do game
    changer   
}

//container of the scenes
lalo.gameScenes = {
    labirinty: labirinty.instance(lalo),
    home: home.instance(lalo)
}
//adicionando ao stage global a paradinha
lalo.add = container => {
    lalo.game.stage.addChild(container)
}


//alterador de scenes.. simplificador
lalo.changer.scenes = [
    // home.instance(lalo), // #1
    // movie.instance(lalo), // #2
    labirinty.instance(lalo) // #3
]


//startand as scenes
lalo.changer.start()


export default lalo