import { ESRCH } from "constants";

/**
 * CONSTANTS
 * **/

const RECUO = 10
const TOP = 0, RIGHT = 1, BOTTOM = 2, LEFT = 3
/*
-----------------
Collisions
-----------------
*/

let collision = (r1, r2) => {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
}


let contain = (sprite, container) => {
    let collision = undefined;


    if (sprite.x < container.x) {//Left
        sprite.x = sprite.x - RECUO
        collision = "left";
    } else if (sprite.y < container.y) {//Top
        sprite.y = sprite.y - RECUO
        collision = "top";
    } else if (sprite.x > container.x) { //Right
        sprite.x = sprite.x + RECUO
        collision = "right";
    } else if (sprite.y > container.y) { //Bottom
        sprite.y = sprite.y + RECUO
        collision = "bottom";
    }
    //Return the `collision` value
    return collision;
}

/**
 * moved the map deacordo com a aproximidade das paredes do que foi renderixado
 * ou seja, quando o persona chegar perto das paredes o mapa anda alguns pixels
 * no sentido inverso ao que o personagem estiver indo, com isso vamos poder dar 
 * um efeito de continuidade no mapa.
 * 
 * 
 * @param int distance - define qual a distancia que o persona deve estar para poder para o map andar
 * @param int moveDistance - define quanto em pixels o mapa vai se mover
 * @param Object map - é o container do mapa que irá se mover deacordo com o que o persona estiver andando
 * 
 * @return void
 */
var moveMap = {
    move: (distance, moveDistance, map, sprite) => {        
        
        let moved = moveMap.hasMoved(distance, moveDistance, map, sprite);
        // console.log(moved);

        if(moved.bool){
            console.log(distance, moveDistance, map, sprite);
            console.log(moved);
            
            switch(moved.side){
                case LEFT:
                    map.stage.x += moveDistance;
                    break;
                case TOP:
                    map.stage.y += moveDistance;
                    break;
                case RIGHT:
                    map.stage.x += (-1 * moveDistance);
                    break;
                case BOTTOM:
                    map.stage.y += (-1 * moveDistance);
                    break;
            }
        }        
    },
    /**
     * 
     * controlle do looping para saber quando eke já saiu da zona sensivel
     */
    hasMoved: (distance, moveDistance, map, sprite) => {
        let bool, side

        //left
        if (sprite.x < distance) {
            bool = true
            side = LEFT
        }else{
            bool = false
        }

        //top
        if (sprite.y < distance) {
            bool = true
            side = TOP
        }else{
            bool = false
        }
        //right
        if (sprite.x > (map.renderer.width - distance)) {
            bool = true
            side = RIGHT
        }else{
            bool = false
        }
        //bottom
        if (sprite.y > (map.renderer.height - distance)) {
            bool = true
            side = BOTTOM
        }else{
            bool = false
        }

        return { bool, side}
    }

}

/**
 * sera necessario fazer um calculo probabilistico para definir se o sprite esta masi para top ou left, e bottom para right.. e assim por diante
 * com esse calculo podemos definir qual a possivel posição do sprite e assim fazer com que ele permaneça na mesma posição que ele esta
 * **/


export {
    collision,
    contain,
    moveMap
}