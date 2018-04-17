import debug from "./debug";


/**
 * a definição desse objeto é simples ele cria os obstaculos no mapa deacordo com algumas opcoes assim como 
 * tamanho em x e y e o size que é basicamente o tamanho da area do obstaciulo, no caso sera atribuido o valor quadardo do mesmo
 * assim como n², onde o ideal é que o x e uy seja o tamanho do objeto multiplicador por 4, pois será criado quadrados com base no valor x e y e preenchido as laterais
 * desses quadrados com o objeto passado mais a baixo(sprite) e o usuario andara entre os mesmos. 
 * 
 * 
 */
const TOP = 0, RIGHT = 1, BOTTOM = 2, LEFT = 3

export default {
    x: 0,
    y: 0,
    size: 0,
    lalo: {},

    instance: o => {
        this.a.lalo = o
    },

    generate: (x, y, size, sprites) => {
        this.a.x = x // size of the section []
        this.a.y = y // size of the section []
        this.a.size = size // tamanho do labirinto tamanho exponencial - quantidade de blocos para row and column

        // definindo base de objeto e lista de imagens para as paredes do labirinto
        var o = [], sprite = sprites || {
            top: 'src/sprites/Isometric/cactus_short_NW.png',
            right: 'src/sprites/Isometric/cactus_short_SW.png',
            bottom: 'src/sprites/Isometric/cactus_short_NE.png',
            left: 'src/sprites/Isometric/cactus_short_SE.png',
        }

        //for com tamanho de cada paradinha row
        for (var i = 0; i < size; i++) {
            for (var c = 0; c < size; c++) {

                // create a new Sprite from an image path
                var bunny, coor

                switch (Math.floor(Math.random() * 4)) {
                    case TOP:
                        bunny = PIXI.Sprite.fromImage(sprite.top)
                        coor = this.a.top(i, c, bunny)
                        bunny.x = coor.x
                        bunny.y = coor.y
                        break;
                    case RIGHT:
                        bunny = PIXI.Sprite.fromImage(sprite.right)
                        coor = this.a.right(i, c, bunny)
                        bunny.x = coor.x
                        bunny.y = coor.y
                        break;
                    case BOTTOM:
                        bunny = PIXI.Sprite.fromImage(sprite.bottom)
                        coor = this.a.bottom(i, c, bunny)
                        bunny.x = coor.x
                        bunny.y = coor.y
                        break;
                    case LEFT:
                        bunny = PIXI.Sprite.fromImage(sprite.left)
                        coor = this.a.left(i, c, bunny)
                        bunny.x = coor.x
                        bunny.y = coor.y
                        break;
                }
                //definindo a paradinha para a parede
                this.a.lalo.sprites.walls.push(bunny)

                debug.sprite(bunny)

                //adicionando para o container
                this.a.lalo.gameScenes.labirinty.add(bunny)
            }
        }

        //for com tamanho de cada paradinha cels
        // add positions of the em um objeto (depois ja colocar as informações do sprite wall )
    },

    // item no lado esquerdo
    left: (row, cell, sprite) => {
        return {
            row,
            cell,
            x: (cell * this.a.x) + sprite.width,
            y: (row * this.a.y) + sprite.height
        }
    },

    //item no lado direito
    right: (row, cell, sprite) => {
        return {
            row,
            cell,
            x: ((cell * this.a.x) + this.a.x) - sprite.width,
            y: (row * this.a.y) + sprite.height
        }
    },

    //item na parte de baixo
    bottom: (row, cell, sprite) => {
        return {
            row,
            cell,
            x: (cell * this.a.x) - sprite.width,
            y: ((row * this.a.y) + this.a.y) - sprite.height
        }
    },

    //item na parte de cima
    top: (row, cell, sprite) => {
        return {
            row,
            cell,
            x: ((cell * this.a.x) + this.a.x) - sprite.width,
            y: (row * this.a.y) - sprite.height
        }
    }
}

// this.a.generate(250, 250, 3)
