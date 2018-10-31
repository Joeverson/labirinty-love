/**
 * 
 * load itens
 * 
 */
import itens from '../resources/itens.json'
import utils from '../utils/utils';

export default {
  addDrop(sprite) {
    const item = new PIXI.Sprite.fromImage(itens[utils.random(itens.length)].uri);
    item.visible = false;
    sprite.addChild(item)
  }
}
