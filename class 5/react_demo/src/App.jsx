import React from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getPokemons() {
  await sleep(2000);
  const url = "https://pokeapi.co/api/v2/pokemon";
  const response = await fetch(url);
  const json = await response.json();

  return json.results;
}

async function getPokemon(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

function App() {
  const [pokemons, setPokemons] = React.useState(null);
  const [pokemonSelected, setPokemonSelected] = React.useState(null);
  const [pokemonData, setPokemonData] = React.useState(null);

  React.useEffect(() => {
    getPokemons().then(setPokemons);
  }, []);

  React.useEffect(() => {
    if (pokemonSelected === null) {
      return;
    }
    getPokemon(pokemonSelected.url).then(setPokemonData);
  }, [pokemonSelected]);

  return (
    <div>
      <h1>Pokemons</h1>

      {pokemonData !== null ? (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      ) : null}

      {pokemons === null ? (
        <div>Loading...</div>
      ) : (
        pokemons.map((pokemon) => (
          <div
            onClick={() => setPokemonSelected(pokemon)}
            key={pokemon.name}
            style={{
              textDecoration:
              pokemonSelected != null && pokemonSelected.name === pokemon.name ? "underline" : "none",
            }}
          >
            {pokemon.name}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
