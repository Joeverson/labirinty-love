/**
 * 
 * LIB PARA DEBUAR OS SPRITES E ALGUMAS COISAS QUE ESTIVEREM NO ISSTEMA E QUE EU ACHAR NECESSARIO DEBUGAR
 * 
 * **/

 export default {
     sprite: s => {
         s.interactive = true
         s.buttonMode = true

         s.on('pointerdown', (o) => {
             let print = `
                X: ${s.x}
                Y: ${s.y}
                width: ${s.width}
                height: ${s.height}
             `

             console.log(print);
             
         });
     }
 }