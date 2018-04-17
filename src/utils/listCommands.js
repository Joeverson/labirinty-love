export default {
    clean: () =>{
        document.getElementById('command').value = ""
    },
    runtime: () => {
        //linpando o campo
        this.a.clean()

        alert(new Date(Date.now()));        
    }
}