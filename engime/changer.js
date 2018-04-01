/*
-----------------
lIB RESPONSAVEL POR MUDAR AS TELAS/ESTAGIOS/ESTADO
DE UM SCENE PARA OUTRO
----------------------
*/

let changer = {
    scenes: [],
    current: -1,
    next: () => {
        if(changer.scenes.length > changer.current){
            changer.current++

            changer.scenes[changer.current].visible(false)
            changer.scenes[changer.current++].visible(true)
        }
    },
    prev: () => {
        if(changer.current > 0){
            changer.scenes[changer.current].visible(false)
            changer.scenes[changer.current--].visible(true)
        }
    },
    //definie umm salto para outra scene, mas deve ser definido as scne "from, to" com base no changer.scenes[array]
    index: (from, to) => {
        changer.scenes[from].visible(false)
        changer.scenes[to].visible(true)
    }
}
