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
        transparent: false
    });

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.backgroundColor = "8D6E63";
    app.renderer.resize(window.innerWidth, window.innerHeight);

    return app
}

/*
-----------------
gameing instance
-----------------
*/

//construct
let lalo = {}

//instanciando o game
lalo.game = init()

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
lalo.sprites = {};


/*
-----------------
containers gameScenes
-----------------
*/
lalo.gameScenes = {
    labirinty: labirinty.instance(lalo),
    home: home.instance(lalo)
};

//alterador de scenes.. simplificador
changer.scenes = [
    home.instance(lalo),
    labirinty.instance(lalo)
];

/*
-----------------
Run - setando as scenas qeu seram renderizadas
-----------------
*/

lalo.gameScenes.home.create();
// lalo.gameScenes.labirinty.create()
// lalo.gameScenes.labirinty.visible(true)
