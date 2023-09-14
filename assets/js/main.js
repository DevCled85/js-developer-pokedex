const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `

            <li class="pokemon ${pokemon.type}">
                        <a class="link-pokemon" href="pokemon.html?id=${pokemon.number}">
                            <span class="number">#${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>
                            <div class="detail">
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>
                                <img src="${pokemon.photo}" alt="${pokemon.name}">
                            </div>
                        </a>
                    </li>
                `
                    
        ).join('')

        pokemonList.innerHTML += newHtml
    })  
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordswithNexPage = offset + limit

    if(qtdRecordswithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})

//------------------------
function getPokemonIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

const pokemonPage = document.getElementById('pokemon-page-api');

function loadPagePokemon() {
    pokeApi.getPokemons().then((pokemons = []) => {
        // Limpe o conteúdo atual do elemento de destino, se necessário
        // pokemonPage.innerHTML = '';

        // Mapeie os detalhes do Pokémon para elementos HTML
        const newPagePokemonHtml = pokemons.map((pokemon) => `
            <div class="pokemon-details">
                <h1 class="pokemon-name">${pokemon.name}</h1>
                <span class="pokemon-number">#${pokemon.number}</span>
                <ol>
                    <li class="pokemon-type types-option-one">Grass</li>
                    <li class="pokemon-type types-option-two">Poison</li>
                </ol>
                <img class="pokemon-photo" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        `).join(''); // Junte todos os elementos em uma única string

        // Adicione os detalhes dos Pokémon ao elemento de destino
        pokemonPage.innerHTML = newPagePokemonHtml;
    });
}

loadPagePokemon();

document.addEventListener('DOMContentLoaded', function () {
    const pokemonPage = document.getElementById('pokemon-page-api');
    // Adicione o evento de clique ou faça outras operações com o elemento aqui
});





