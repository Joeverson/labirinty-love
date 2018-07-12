/*
-----------------
lIB RESPONSAVEL POR MUDAR AS TELAS/ESTAGIOS/ESTADO
DE UM SCENE PARA OUTRO
----------------------
*/



export default {
    scenes: [],
    current: -1,
    next: () => {
        if(this.a.current < this.a.scenes.length){
            if(this.a.current == -1){                
                this.a.scenes[this.a.current++].visible(true)
            }else{
                this.a.scenes[this.a.current].visible(false)                
                this.a.scenes[this.a.current++].visible(true)
            }
        }
    },
    prev: () => {
        if(this.a.current > 0){
            this.a.scenes[this.a.current].visible(false)
            this.a.scenes[this.a.current--].visible(true)
        }
    },
    //definie umm salto para outra scene, mas deve ser definido as scne "from, to" com base no this.a.scenes[array]
    index: (from, to) => {
        this.a.scenes[from].visible(false)
        this.a.scenes[to].visible(true)
    }, 
    //inicia a aplicação como um game
    start: scene => {
        scene = false || scene             
        
        //create all scenes
        _.forEach(this.a.scenes ,element => {
            element.create()
        });

        //show scene init
        if(scene){
            scenes.visible(true)
            this.a.scenes[current].visible(false)
        }else{                             
            this.a.scenes[0].visible(true)
            this.a.current++
        }
    }
}
