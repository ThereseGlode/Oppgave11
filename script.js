console.log('Hello!');

const fetchBtn = document.getElementById('fetchBtn');
const pokemonInfo = document.getElementById('pokemonInfo');
const loading = document.getElementById('loading');

async function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 151) + 1; // 1 til 151 (1. generasjon)

  try {
    loading.classList.remove('hidden');
    pokemonInfo.innerHTML = '';

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await res.json();

    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const image = data.sprites.front_default;
    const height = data.height / 10; // konverter til meter
    const weight = data.weight / 10; // konverter til kg
    const type = data.types.map(t => t.type.name).join(', ');

    pokemonInfo.innerHTML = `
      <img src="${image}" alt="${name}" class="mx-auto mb-2 w-24 h-24" />
      <h2 class="text-xl font-semibold">${name}</h2>
      <p>Type: ${type}</p>
      <p>Høyde: ${height} m</p>
      <p>Vekt: ${weight} kg</p>
    `;
  } catch (err) {
    pokemonInfo.innerHTML = `<p class="text-red-500">Noe gikk galt. Prøv igjen.</p>`;
    console.error(err);
  } finally {
    loading.classList.add('hidden');
  }
}

fetchBtn.addEventListener('click', fetchRandomPokemon);