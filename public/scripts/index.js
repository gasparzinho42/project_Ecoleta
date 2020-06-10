

document
    .querySelector("#modal form .searchPoints h2 span")
    .addEventListener("click",fecharTela)
document
    .querySelector("#page-home .content main a")
    .addEventListener("click",abrirTela)

    function fecharTela(event){
        console.log(event.target)
        modal.classList.add("hide")
    }
    function abrirTela(event){
        console.log(event.target)
        modal.classList.remove("hide")
    }
