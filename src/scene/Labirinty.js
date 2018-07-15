import utils from "../utils/utils";


export default class Labirinty {

  constructor() {
    this.lalo = false;

    // conteiner in the scenes
    this.container = new PIXI.Container();

    //state looping - definição de que looping será chamado para executar
    this.state = "";
  }

  /**
   * adicionando objetos a scene
   * 
   * caso seja um array ele vai inserindo todos que vem
   * 
   * @param {*} object 
   */
  add(object) {
    if (object instanceof Array) {
      _.forEach(object, (o) => {
        this.container.addChild(o);
      })
    } else {
      this.container.addChild(object);
    }
  }

  /**
   * 
   * criando o container e adicionando no escopo global
   * e já definindo como invisible
   * 
   */

  create(lalo) {
    
    // create persona player
    this.player(lalo);
    
    /**
     * Criando o map floor
     * */
    const map = lalo.map.labth.generate(lalo, 151, 182, 3, {
      left: "src/sprites/Isometric/cliffBrown_block_SE.png",
      right: "src/sprites/Isometric/cliffBrown_block_SE.png",
      top: "src/sprites/Isometric/cliffBrown_block_SE.png",
      bottom: "src/sprites/Isometric/cliffBrown_block_SE.png"
    });
    
    // add objects ao container
    this.add(map);
    
    // Escutando os comandos disparados pelos jogador
    lalo.action.commands.listen(lalo);
    
    // Deixando esse container visivel
    this.container.visible = true;

    //adiciono no global esse container scene
    lalo.add(this.container);
  }

  /**
   * metodo resposavel por definir se vai estar visible ou não
   * @param {Bool} is 
   */
  visible(is) {
    this.container.visible = is;
  }
  /**
   * 
   * instance and prepare mosnters
   * 
   */
  monsters(lalo) {
    //cria os monstros na memoria
    const monster = lalo.monsters.loadSheet(lalo, 'src/sprites/0x72_16x16DungeonTileset.v4.png', [{ // #1 monstro
        x: 133,
        y: 178,
        w: 22,
        h: 30
      },
      { // #2 monstro
        x: 102,
        y: 182,
        w: 20,
        h: 26
      },
      { // #3 monstro
        x: 160,
        y: 177,
        w: 32,
        h: 31
      }
    ], 2)
    
    monster.then(monster => {
      // adicionando ao container do labirinto
      this.add(monster);
    });

  }

  /**
   * 
   * instance and prepare player
   * 
   */
  player(lalo) {
    //cria os monstros na memoria
    const player = lalo.persona.moveload(lalo, 'src/sprites/878773e1bbd2db4dda551f29039b6ee3-d6qwisk.png', {
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
    });

    player.then((player) => {
      //colocando a barra de vida
      lalo.action.hp.bar(player);

      //definindo quem vai tratar o looping
      this.state = this.personRunner;

      // adicionando ao container do labirinto
      this.add(player);
      
      // controller
      lalo.joystick(player);

      // movendo o persona tempos em tempos
      lalo.game.ticker.add(delta => this.gameLoop(lalo, delta));

      // Criando os monstros
      this.monsters(lalo);
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
      if (lalo.fisic.collision(wall, lalo.sprites.persona)) {
        lalo.fisic.leap(lalo.sprites.persona, wall);
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
      if (lalo.fisic.collision(monster, lalo.sprites.persona)) {
        // enviando para o remoto
        // lalo.remote.emit('die', 'cago');
        
        // caso esteja invisivel ele não bloqueia o persona
        if (monster.visible) {
          // block utrapass objects using recue
          lalo.fisic.leap(lalo.sprites.persona, monster);
          
          // battle in monster 'attack'
          lalo.action.battle.fight(lalo, {
            persona: lalo.sprites.persona,
            monster
          });
        }
        
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
