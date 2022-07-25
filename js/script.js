// generating random numbers for random pokemon moves
const randomNumZero = Math.floor(Math.random() * 50);
const randomNumOne = Math.floor(Math.random() * 50);
const randomNumTwo = Math.floor(Math.random() * 50);
const randomNumThree = Math.floor(Math.random() * 50);

const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonGif = document.querySelector('.pokemon_gif');

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

const pokemonTypeZero = document.querySelector('.pokemon_type_0')

const pokemonMoveZero = document.querySelector('.pokemon_move_0')
const pokemonMoveOne = document.querySelector('.pokemon_move_1')
const pokemonMoveTwo = document.querySelector('.pokemon_move_2')
const pokemonMoveThree = document.querySelector('.pokemon_move_3')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading..';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonGif.style.display = 'block';

    pokemonTypeZero.style.display = 'block';
    // show moves
    pokemonMoveZero.style.display = 'block';
    pokemonMoveOne.style.display = 'block';
    pokemonMoveTwo.style.display = 'block';
    pokemonMoveThree.style.display = 'block';

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';

    pokemonTypeZero.innerHTML = data['types']['0']['type']['name']
    pokemonMoveZero.innerHTML = data['moves'][`${randomNumZero}`]['move']['name']
    pokemonMoveOne.innerHTML = data['moves'][`${randomNumOne}`]['move']['name']
    pokemonMoveTwo.innerHTML = data['moves'][`${randomNumTwo}`]['move']['name']
    pokemonMoveThree.innerHTML = data['moves'][`${randomNumThree}`]['move']['name']
    searchPokemon = data.id
    }else {

        pokemonTypeZero.style.display = 'none';
        // remove moves
        pokemonMoveZero.style.display = 'none';
        pokemonMoveOne.style.display = 'none';
        pokemonMoveTwo.style.display = 'none';
        pokemonMoveThree.style.display = 'none';

        pokemonGif.style.display = 'none';
        pokemonName.innerHTML = 'Not found!';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());   
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }   
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon)
