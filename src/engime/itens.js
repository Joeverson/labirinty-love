/**
 * itens engime
 *
 */

export default {
  load (lalo) {
    const b = new PIXI.Sprite.fromImage(`src/sprites/0x72_16x16DungeonTileset.v4.png`)
    // b.frame = new PIXI.Rectangle(10, 10, 10, 10)
    // const s = new PIXI.Sprite(b)
    console.log(lalo.scenes.labirinty)

    lalo.scenes.labirinty.add(b)
  }
}
