/**
 * 
 * aqui vai ficar as funções mais uteis para não
 * ficar escrevendo muita coisa de forma repetida
 * pq  fica chato
 * 
 * 
 */

 export default {
     /**
      * para poder pegar um numero aleatorio, basta fazer a chamada
      * e passar um numero qeu vai ser executado a funçãod e chamada aleatoria
      */
     random: (number) => {
        return Math.floor(Math.random()*number)
     },
    /**
     * debug é um metodo que ajuda a debugar de forma geral algumas coisas que 
     * vejo como necessario
     */
     debug: {
         /**
          * esse modo do debug funciona como click onde vc passa por 
          * parametro o elemento do sprite e ao clicar nele
          * ele informa algumas coisas referente aposição do sprite
          * e o seu tamanho
          */
         sprite: (s, i, t) => {
             s.interactive = true
             s.buttonMode = true

             s.on('pointerdown', (o) => {
                 let print = `
                X: ${s.x}
                Y: ${s.y}
                i: ${i}
                t: ${t}
                width: ${s.width}
                height: ${s.height}
             `

                 console.log(print, s)

             });
         }
     }
 }