/**
 *
 * scene que cria o labitrinto
 *
 */
class Labirinty {
  constructor ({...args}) {
    Object.assign(this, args)
    
    // container do labirinto
    this.container = new PIXI.Container()
    this.container.name = 'labirinth'

    // container do game garal
    this.lalo.application.stage.addChild(this.container)

    // criando a instancia do game
    this.create(this.lalo)    
  }
  /**
   * metodo responsavel por pegar o container
   * pelo seu nome
   * 
   * @param {Object} container 
   */
  getContainer(containerName) {
    return this.container.children.filter(container => container.name === containerName)
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
        this.container.addChild(o)
      })
    } else {
      this.container.addChild(object)
    }
  }

  /**
   *
   * criando o container e adicionando no escopo global
   * e já definindo como invisible
   *
   */

  async create (lalo) {
    // create persona player
    await this.player(lalo)

    // Criando os monstros
    await this.monsters(lalo)
    
    /**
     * Criando o map floor
     * */
    lalo.map.labth.generate(lalo, 151, 182, 3, {
      left: 'src/sprites/Isometric/cliffBrown_block_SE.png',
      right: 'src/sprites/Isometric/cliffBrown_block_SE.png',
      top: 'src/sprites/Isometric/cliffBrown_block_SE.png',
      bottom: 'src/sprites/Isometric/cliffBrown_block_SE.png'
    })
    
    // Escutando os comandos disparados pelos jogador
    lalo.commands.listen(lalo)
    
    // Deixando esse container visivel
    this.container.visible = true
    
    // adiciono no global esse container scene
    lalo.add(this.container)

    // movendo o persona tempos em tempos
    lalo.application.ticker.add(delta => this.gameLoop(this.getContainer('persona'), lalo, delta))
  }

  /**
   * metodo resposavel por definir se vai estar visible ou não
   * @param {Bool} is
   */
  visible(is) {
    this.container.visible = is
  }
  
  /**
   *
   * instance and prepare mosnters
   *
   */
  async monsters (lalo) {
    // cria os monstros na memoria
    const monster = await lalo.monsters.loadSheet(lalo, 'src/sprites/0x72_16x16DungeonTileset.v4.png', [{ // #1 monstro
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
    }], 2)

    this.add(monster)    
  }

  /**
   *
   * instance and prepare player
   *
   */
  async player (lalo) {
    // cria os monstros na memoria
    const sprite = new lalo.Sprite({ name: 'persona' })

    const player = await sprite.load(lalo, 'src/sprites/878773e1bbd2db4dda551f29039b6ee3-d6qwisk.png', {
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
      }],
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
      }],
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
      }],
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
      }]
    }, {
      w: 28,
      h: 38
    })
    
    // definindo quem vai tratar o looping
    this.state = this.personRunner

    // aducionando os controler ao personagem
    lalo.joystick(player)

    // adicionando ao container do labirinto
    this.add(player)
  }

  /**
   * game looping
   * @param {*} delta
   */
  gameLoop (person, lalo, delta) {
    this.state(person, lalo, delta)
  }

  /**
   *
   * funcitons game looping
   *
   */

  personRunner (person, lalo, delta) {
    // Use the cat's velocity to make it move
    person.x += person.vx
    person.y += person.vy
    
    // get the walls in scenes
    const walls = this.getContainer('walls').children;    
    const monsters = this.getContainer('monsters').children;
    
    /**
     * colisão quando o persona tenta passar pelas paredes
     * esse foreache verifica se ele esta batendo em algum
     * dos obstaculos e o contain faz uma contenção para que ele não atravese
     */
    _.forEach(walls, wall => {
      if (lalo.collision(wall, person)) {
        lalo.leap(person, wall)
      }
    })

    /**
     *
     * verificando se o persona bate em algum monstro
     * e com isso ele da um zoom e começa a batalha
     *
     *
     */
    _.forEach(monsters, monster => {
      if (lalo.fisic.collision(monster, person)) {
        // enviando para o remoto
        // lalo.remote.emit('die', 'cago')

        // caso esteja invisivel ele não bloqueia o persona
        if (monster.visible) {
          // block utrapass objects using recue
          lalo.fisic.leap(person, monster)

          // battle in monster 'attack'
          lalo.action.battle.fight(lalo, {
            persona: person,
            monster
          })
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

    // lalo.moveMap.move(200, 10, lalo.game, lalo.sprites.persona)
  }
}

export default Labirinty
