import utils from "../utils/utils";
import { runInThisContext } from "vm";


/**
 * a definição desse objeto é simples ele cria os obstaculos no mapa deacordo com algumas opcoes assim como 
 * tamanho em x e y e o rows que é basicamente o tamanho da area do obstaciulo, no caso sera atribuido o valor quadardo do mesmo
 * assim como n², onde o ideal é que o x e uy seja o tamanho do objeto multiplicador por 4, pois será criado quadrados com base no valor x e y e preenchido as laterais
 * desses quadrados com o objeto passado mais a baixo(sprite) e o usuario andara entre os mesmos. 
 * 
 * 
 */
const TOP = 0, RIGHT = 1, BOTTOM = 2, LEFT = 3

export default {
    width: 0,
    height: 0,
    rows: 0,
    lalo: {},

    instance: o => {
        this.a.lalo = o
    },
    container: new PIXI.Container(),
    add: sprite => {
        this.a.container.addChild(sprite)
    },
    generate: (width, height, rows, sprites) => {
        this.a.width = width // rows of the section []
        this.a.height = height // rows of the section []
        this.a.rows = rows // tamanho do labirinto tamanho exponencial - quantidade de blocos que iram ser utilizados para montar o map
        let blocks = [], cells = 0

        // definindo base de objeto e lista de imagens para as paredes do labirinto
        var o = [], sprite = sprites || {
            top: 'src/sprites/Isometric/cactus_short_NW.png',
            right: 'src/sprites/Isometric/cactus_short_SW.png',
            bottom: 'src/sprites/Isometric/cactus_short_NE.png',
            left: 'src/sprites/Isometric/cactus_short_SE.png',
        }


        /**
         * 
         * desenhando o losango onde vais er a base de draw do map
         * 
         */
        let plus = this.a.addBlocks.plus(rows, cells, sprite) // definindo a primeiro parte do map
        console.log(plus);
        
        let less = this.a.addBlocks.less(rows, plus.cells, sprite) // desenhando a segunda parte do map

        //organizando os blocos no map para apresentar no render
        this.a.organizeBlocks()


    },
    addBlocks: {
        plus: (rows, cells, sprite) => {
            let blocks = []
            //adicionando os blocos necessarios para montar o map no array do map em sprites de forma positiva
            for (var i = 0; i < rows; i++) {
                // quantidade de blocos por linha
                cells++

                for (var t = 0; t < cells; t++) {
                    // create a new Sprite from an image path
                    blocks.push(PIXI.Sprite.fromImage(sprite.top))
                }

                // blocks.reverse()

                //definindo a paradinha para a parede
                this.a.lalo.sprites.map.push(blocks)


                // clean the blocs
                blocks = []
            }

            return { cells }
        },
        less: (rows, cells, sprite) => {
            let blocks = []
            //adicionando os blocos necessarios para montar o map no array do map em sprites de forma positiva
            for (var i = 0; i < (rows - 1); i++) {
                // quantidade de blocos por linha
                cells--


                for (var t = 0; t < cells; t++) {
                    // create a new Sprite from an image path
                    blocks.push(PIXI.Sprite.fromImage(sprite.top))
                }

                // blocks.reverse()

                //definindo a paradinha para a parede
                this.a.lalo.sprites.map.push(blocks)


                // clean the blocs
                blocks = []
            }

            return { cells }
        }
    },
    organizeBlocks: () => {
        const Y = 53
        //calculo para  primeiro bloco
        // g.sprites.walls[0].x = g.game.renderer.screen.width / 2
        //altura ideal para o proximo bloco: y = 54px

        //segundo bloco deve ter essa configuração e ir exponencialmente calculando o valor de x de acordo com os dados de rows
        //g.sprites.walls[1].x = (g.game.renderer.screen.width/2) - (g.sprites.walls[0].width / 2)

        //invertrendo a insersção dos blocos do array
        // this.a.lalo.sprites.map.reverse()

        _.forEach(this.a.lalo.sprites.map, (blocks, i) => {
            if (blocks.length == 1) {

                this.a.lalo.sprites.map[i][0].x = this.a.lalo.game.renderer.screen.width / 2
                this.a.lalo.sprites.map[i][0].y = (Y * i)

                this.a.add(this.a.lalo.sprites.map[i][0])
            } else {
                
                for(var t = 0; t < blocks.length; t++){                    
                    if(i < this.a.rows) {
                        if (_.isUndefined(this.a.lalo.sprites.map[i][t - 1])) { // caso seja o primeiro bloco da fila
                            this.a.lalo.sprites.map[i][t].x = (this.a.lalo.sprites.map[i - 1][0].x - this.a.width / 2)
                            this.a.lalo.sprites.map[i][t].y = (Y * i)
                        } else {
                            this.a.lalo.sprites.map[i][t].x = this.a.lalo.sprites.map[i][t - 1].x + this.a.width
                            this.a.lalo.sprites.map[i][t].y = (Y * i)
                        }
                    }else{
                        if (_.isUndefined(this.a.lalo.sprites.map[i][t - 1])) { // caso seja o primeiro bloco da fila
                            this.a.lalo.sprites.map[i][t].x = (this.a.lalo.sprites.map[i - 1][0].x + this.a.width / 2)
                            this.a.lalo.sprites.map[i][t].y = (Y * i)
                        } else {
                            this.a.lalo.sprites.map[i][t].x = this.a.lalo.sprites.map[i][t - 1].x + this.a.width
                            this.a.lalo.sprites.map[i][t].y = (Y * i)
                        }                        
                    }
                    //  adicionando para o container
                    this.a.add(this.a.lalo.sprites.map[i][t])
                }
            }


        })



        //for com tamanho de cada paradinha cels
        // add positions of the em um objeto (depois ja colocar as informações do sprite wall )
        this.a.lalo.gameScenes.walls = this.a.container
        this.a.lalo.gameScenes.labirinty.add(this.a.container)
    },
    // org1:(row)=>{
    //     if(row < 1 || isNaN(row)) return;

    //     this.a.lalo.sprites.map[i].x = this.a.lalo.game.renderer.screen.width / 2
    //     this.a.lalo.sprites.map[i].y = 0

    //     return org1(row - 1);
    // },    
}

// this.a.generate(250, 250, 3)
