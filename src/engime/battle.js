/**
 * 
 * esse escript é completamente voltado
 * para a forma de batalhas PvE no sistema
 * 
 * todo o comportamento durante a batalha vai esta aqui
 * descrita e programada, no caso essa lib entra em funcionabilidade
 * quando o persona entra em contato com um monstro
 * 
 * 
 */


export default {
    lalo: {},
    fight: (lalo) => {
        //  definindo estancia
        this.a.lalo = lalo
        this.a.zoom()

    },
    /**
     * Fazendo um zoom no personagem durante uma batalha
     * 
     */
    zoom: () => {

        // fazendo o zook no ambiente
        this.a.lalo.game.stage.scale.x = 2
        this.a.lalo.game.stage.scale.y = 2

        //deixando o zoom no personagem
        // this.a.lalo.game.stage.x = this.a.lalo.sprites.persona.x + 300
        // this.a.lalo.game.stage.y = this.a.lalo.sprites.persona.y + 300

    }
}