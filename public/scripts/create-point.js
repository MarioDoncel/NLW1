    function populateUFs() {
        const ufSelect = document.querySelector("select[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
            
        })   
    }

    populateUFs()

    function getCities(event) {
        const citySelect = document.querySelector("select[name=city]")
        const stateInput = document.querySelector("input[name=state]")

        const ufValue = event.target.value
        const indexOfSelectedState = event.target.selectedIndex
        stateInput.value = event.target.options[indexOfSelectedState].text

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = "<option value>Selecione a cidade</option>"
        citySelect.disabled = true

        fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })   
        }


    document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


    //Itens de coleta

    let selectedItens = []
    const collectedItems = document.querySelector("input[name=items]")

    function handleSelectedItem(event) {
        const itemLi = event.target

        //add ou remover classe com JS
        itemLi.classList.toggle("selected")

        const itemId = event.target.dataset.id

        //verificar se existem itens selecionados, se sim
        //pegar os selecionados
        const alreadySelected = selectedItens.findIndex(item => item == itemId) // sera true ou false

        //se ja tiver selecionado tirar da seleção
        if (alreadySelected >= 0) {
            //tirar da seleção
            const filteredItens = selectedItens.filter(item => {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })
            selectedItens = filteredItens
        } else {
            //se não estiver selecionado, adicionar a seleção
            selectedItens.push(itemId)
        }

        //atualizar o campo escondido com os itens selecionados
        collectedItems.value = selectedItens
    }

    //pegar todos os li's
    const itensToCollect = document.querySelectorAll(".itens-grid li")
    
    for (const item of itensToCollect) {
        item.addEventListener("click", handleSelectedItem)
    }

   
    
   
   