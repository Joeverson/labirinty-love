import utils from "../utils/utils";
/*
    SCENE Monstros
*/
/**
 * 
 * tenho que saber a lista de monstros-- mas são definidos por monsttos e level, força(atributos de modo geral)
 * 
 * Monstros [] sprites
 * 
 * Atributos {
 *  força, - dano que da ao persona
 *  velocidade, - valor que define quem vai dar o primeiro ataque e se vai se esquevar
 *  hp - total de dano que o carinha vai aguantar
 * }
 * 
 */


export default class Monsters {
  constructor() {
    this.container = new PIXI.Container();
  }

  //adicionando objetos a scene
  add(object) {
    this.container.addChild(object);
  }

  // passa um array de names dos sprites e a quantidade de quantos vai repetir
  create(lalo, monsters, qtdIqualsMonster) {
    let m = [];
    let atributos;

    return new Promise(resolve => {
      // criando os sprites com bas no nome que foi dado a ele
      _.forEach(monsters, monster => {
        for (var i = 0; i < qtdIqualsMonster; i++) {

          //fazendo um clone do monstro para poder fazer varias copias  
          var m = PIXI.Sprite.fromImage(monster);

          // gerando os atributos de forma aleatoria para os monstros
          atributos = lalo.action.attributes.generate();

          // atribuindo nova propriedade para o sprite
          m.atributos = atributos;

          // distribuindo na tela
          this.distribuir(lalo, m);


          resolve(this.container);

        }
      })
    })
  }

  // criando com base num sheet de sprites
  /**
   * sheet: uma string com o caminho do sheet dos sprites
   * params: é um atributo que possue um array de objetos que possue as posições do monstro no sprite
   * ex: {
   *      x: - axis x da imagem no sprite 
   *      y: - axis y da imagem no sprite
   *      w: - width da imagem do sprite
   *      h: - height da imagem do sprite
   * }
   * 
   * qtdIquaisMonster: define a quantidade de copias para cada monstro
   */
  loadSheet(lalo, sheet, params, qtdIqualsMonster) {
    let monsters = [];
    let atributos;

    return new Promise(resolve => {
      PIXI.loader
        .add('monsters', sheet).load((loader, resources) => {

          /**
           * fazendo um for na quantidade de monstros que vai ter 
           * deacordo com os parametros do x e y dado pelo cliente
           * e con isso vamos pegar individualmente os sprites dentro do sheet
           * 
           * apois pegar o sprite vamos aplicar a quandidade de clones em cada monstrinho 
           * usando o parametro de qtdIqualsMonster
           * 
           */
          _.forEach(params, attr => {
            var mm = new PIXI.Texture(resources.monsters.texture.baseTexture, 0, 0, 0, 0);
            mm.frame = new PIXI.Rectangle(attr.x, attr.y, attr.w, attr.h);

            monsters.push(mm);
          });

          // fazendo um for em cada posição qeu foi definida anterriormente
          _.forEach(monsters, textureM => {

            //fazendo deacordo com a quantidade pedida
            for (var i = 0; i < qtdIqualsMonster; i++) {
              // pegando os frame do sheet para remover só o spŕite do monstro
              var m = new PIXI.Sprite(textureM);

              //almentando os mesmos
              m.scale.x *= 2;
              m.scale.y *= 2;

              /* 
                  gerando os atributos de forma aleatoria para os monstros
                  atribuindo nova propriedade para o sprite
              */
              m.atributos = lalo.action.attributes.generate();

              // identificando o level pelas cores
              this.level(lalo, m);
              
              // debug
              utils.debug.sprite(m);

              //dsitribuindo
              this.distribuir(lalo, m);

            }

          })

          lalo.scenes.monsters = this.container;
          //returnn promisse
          resolve(this.container);
        });
    })
  }

  /**
   * 
   * Methodo define a distibuição dos monstros em torno do mapa
   * onde vamos definir quantos voce quer epalhados por ai
   * e tals
   * 
   */
  distribuir(lalo, monster) {
    let w = lalo.game.renderer.screen.width;
    let h = lalo.game.renderer.screen.height;


    // //definindo um lugar a leatorio para o monstro
    monster.x = utils.random(w);
    monster.y = utils.random(h);

    //adicionando no container
    this.add(monster);

    //salvando no sprites global 
    lalo.sprites.monsters.push(monster);

  }

  level(lalo, monster) {
    const colors = [{
      zone: '',
      color: '0x43BCCD'
    }, {
      zone: '',
      color: '0x009000'
    }, {
      zone: '',
      color: '0xF9C80E'
    }, {
      zone: '',
      color: '0xEA3546'
    }];

    const monsterAttr = monster.atributos;

    // quantidade do valor da faita para alternar as cores
    const faixa = lalo.action.attributes.max.FORCA / colors.length;

    // populando a zonas com valores acumulados e com isso poder ajustar as coisas
    colors.map((c, i) => {
      c.zone = faixa * (i+1);
    });
    
    // buscando qual faixa o monstro se encaixa melhor
    const f = colors.filter( c => c.zone <= monsterAttr.forca).pop();
    console.log(f);
    
    // colocando a barra de life no monstro
    lalo.action.hp.bar(monster, (f == undefined ? 0x43BCCD : f.color));
    
  }

  visible(is) {
    this.container.visible = is;
  }

}
