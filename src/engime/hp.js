/**
 * 
 * essa lib é responsavel por desenhar a barra de lige na cabeça do carinha
 * 
 * 
 */

export default {
    bar: (sprite, color) => {
        color = color || 0xEF5350;
        
        var graphics = new PIXI.Graphics();

        graphics.lineStyle(3, 0x000000, 1);
        graphics.beginFill(color, 0.95);
        graphics.drawRoundedRect(50, 450, 300, 20, 5);
        graphics.endFill();


        graphics.x = -25
        graphics.y = -110
        graphics.scale.x = 0.2
        graphics.scale.y = 0.2

        sprite.addChild(graphics)
    },
    damage: (sprite, int) => {
        return new Promise(resolve => {
            if (sprite.children[0].width < int)
                sprite.children[0].width = 0
            else
                sprite.children[0].width = sprite.children[0].width - int

            resolve()
        })
    }
}