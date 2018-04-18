/**
 * 
 * essa lib é responsavel por desenhar a barra de lige na cabeça do carinha
 * 
 * 
 */

 export default {
     bar: (sprite) => {
         var graphics = new PIXI.Graphics();

         graphics.lineStyle(1, 0xFF00FF, 1);
         graphics.beginFill(0xFF00BB, 0.95);
         graphics.drawRoundedRect(50, 450, 300, 50, 5);
         graphics.endFill();

         sprite.addChild(graphics)
     }
 }