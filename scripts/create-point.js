    function populateUFs() {
        const ufSelect = document.querySelector("select[name=state]")

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

        const ufValue = event.target.value

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })   
        }


    document
    .querySelector("select[name=state]")
    .addEventListener("change", getCities)