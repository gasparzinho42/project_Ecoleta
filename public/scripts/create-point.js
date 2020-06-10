function poputlateUFs(event){
    const ufSelect =  document.querySelector("select[name=uf]")
    
    
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then( states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}
poputlateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    citySelect.innerHTML = '<option>Selecione a Cidade</option>'
    citySelect.disabled = true
    
    
    const ufvalue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    
    console.log(event.target.value)


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`
    fetch(url)
    .then(res => res.json())
    .then( lista => {
        
        for(const municipios of lista){
            citySelect.innerHTML += `<option value="${municipios.nome}">${municipios.nome}</option>`
        }
        citySelect.disabled = false
    } )

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
// pegar todos os li`s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id




    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado, 
    if( alreadySelected >= 0 ) {
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}
// }
// // document
// //     .querySelector("#modal form .searchPoints h2 span")
// //     .addEventListener("click",fecharTela)
// document
//     .querySelector("form button")
//     .addEventListener("click",abrirTela)

//     function fecharTela(event){
//         console.log(event.target)
//         modal.classList.add("hide")
//     }
//     function abrirTela(event){
//         console.log(event.target)
//         modal.classList.remove("hide")
//     }
