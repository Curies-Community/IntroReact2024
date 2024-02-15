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

  console.log("pintando");

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
          <form
            key={pokemon.name}
            onSubmit={(event) => {
              event.preventDefault();
              setPokemonSelected(pokemon);
              getPokemon(pokemonSelected.url).then(setPokemonData);
            }}
          >
            <button
              style={{
                textDecoration:
                  pokemonSelected != null &&
                  pokemonSelected.name === pokemon.name
                    ? "underline"
                    : "none",
              }}
            >
              {pokemon.name}
            </button>
          </form>
        ))
      )}
    </div>
  );
}

export { App };
