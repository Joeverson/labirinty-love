export default {   
    clean: (lalo) =>{
        document.getElementById('command').value = ""
    },
    runtime: (lalo) => {
        //linpando o campo
        this.a.clean()

        alert(new Date(Date.now()));        
    },
    fugir: (lalo) => {
        lalo.game.stage.scale.x = 1;
        lalo.game.stage.scale.y = 1;
        lalo.game.stage.x = 0;
        lalo.game.stage.y = 0;
        this.a.clean();
    }
}