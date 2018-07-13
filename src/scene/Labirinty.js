
import monsters from "../engime/Monsters";
import utils from "../utils/utils";
import battle from "../engime/battle";
import hp from "../engime/hp";


export default class Labirinty {

  constructor() {
    this.lalo = false;
    this.container = new PIXI.Container();

    //state looping - definição de que looping será chamado para executar
    this.state = "";
  }

  /**
   * adicionando objetos a scene
   * 
   * @param {*} object 
   */
  add(object) {
    this.container.addChild(object);
  }

  /**
   * 
   * criando o container e adicionando no escopo global
   * e já definindo como invisible
   * 
   */

  create(lalo) {
    //instanciando tudo dentro do container
    this.loads(lalo, (objects) => {
      
      //add the joystick for one personagem
      lalo.joystick(lalo.sprites.persona);

      //adiciono no global esse container scene
      lalo.add(this.container);

      utils.debug.sprite(lalo.sprites.persona);

      /***
       * 
       * Criando o labirinto
       * 
       * */
      lalo.labth.instance(lalo);

      lalo.labth.generate(151, 182, 3, {
        left: "src/sprites/Isometric/cliffBrown_block_SE.png",
        right: "src/sprites/Isometric/cliffBrown_block_SE.png",
        top: "src/sprites/Isometric/cliffBrown_block_SE.png",
        bottom: "src/sprites/Isometric/cliffBrown_block_SE.png"
      });


      /**
       * 
       * Criando os monstros
       * 
       */

      //cria os monstros na memoria
      lalo.monsters.loadSheet(lalo, 'src/sprites/0x72_16x16DungeonTileset.v4.png', [
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
          this.add(container);
      })

      /***
       * 
       * escutando os comandos disparados pelos jogador
       * 
       * */
      lalo.commands.listen(lalo);

      // add objects ao container
      _.forEach(objects, o => {
        this.add(o);
      });

      /**
       * 
       * deixando esse container visivel
       * 
       */
      this.container.visible = true;
    })
  }

  /**
   * metodo resposavel por definir se vai estar visible ou não
   * @param {Bool} is 
   */
  visible(is) {
    this.container.visible = is;
  }

  /*
  -----------------
  load and cache sprites
  -----------------
  */

  loads(lalo, callback) {
    // load the texture we need
    PIXI.loader
      .add('person', 'src/sprites/878773e1bbd2db4dda551f29039b6ee3-d6qwisk.png').load((loader, resources) => {

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
          up: [{
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
          right: [{
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
          down: [{
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

        const persona = new PIXI.Sprite(resources.person.texture);

        // persona.interactive = true
        // persona.buttonMode = true

        //atribuindo ao lalo as sprites para serem usdas em qualquer lugar
        lalo.sprites.persona = persona;

        lalo.sprites.persona.vx = 0;
        lalo.sprites.persona.vy = 0;

        lalo.sprites.persona.x = window.innerWidth / 2;
        lalo.sprites.persona.y = window.innerHeight / 2;

        //colocando a barra de vida
        hp.bar(lalo.sprites.persona);

        //definindo quem vai tratar o looping
        this.state = this.personRunner;

        lalo.game.ticker.add(delta => this.gameLoop(lalo, delta));


        callback([lalo.sprites.persona]);
      });
  }

  /**
   * game looping
   * @param {*} delta 
   */
  gameLoop(lalo, delta) {
    this.state(lalo, delta);
  }

  /**
   * 
   * funcitons game looping
   * 
   */

  personRunner(lalo, delta) {
    //Use the cat's velocity to make it move
    lalo.sprites.persona.x += lalo.sprites.persona.vx;

    lalo.sprites.persona.y += lalo.sprites.persona.vy;

    /**
     * colisão quando o persona tenta passar pelas paredes
     * esse foreache verifica se ele esta batendo em algum 
     * dos obstaculos e o contain faz uma contenção para que ele não atravese 
     */
    _.forEach(lalo.sprites.walls, wall => {
      if (collision(wall, lalo.sprites.persona)) {
        contain(lalo.sprites.persona, wall);
      }
    })

    /**
     * 
     * verificando se o persona bate em algum monstro
     * e com isso ele da um zoom e começa a batalha
     * 
     * 
     */
    _.forEach(lalo.sprites.monsters, monster => {
      if (lalo.collision(monster, lalo.sprites.persona)) {
        // enviando para o remoto
        lalo.remote.emit('die', 'cago');
        // contain(lalo.sprites.persona, monster);
        battle.fight(lalo);
      }
    })


    /**
     * 
     * instanciando o move map
     * 
     * OBS esta bugado ele não se move por um tempo e depois para mas sim 
     * diva sem para de mexer .....
     */

    // lalo.moveMap.move(200, 10, lalo.game, lalo.sprites.persona);

  }
}




//floor
function floor_render() {
  let texture = PIXI.Texture.fromImage('img/sprites/floor.png');
  var sprite;

  let loopw = Math.floor(window.innerWidth / texture.width);
  let looph = Math.floor(window.innerHeight / texture.height);

  // for(var h=0; h<looph; h++){


  //     for(var i=0; i<loopw; i++){

  //         sprite = new PIXI.Sprite(texture)

  //         sprite.x = sprite.x+i
  //         sprite.y = sprite.y+h    


  //         this.add(sprite)
  //     }
  // }
}
