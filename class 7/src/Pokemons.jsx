import { Suspense } from "react";
import {
  NavLink,
  defer,
  useLoaderData,
  Await,
  Outlet,
  json,
} from "react-router-dom";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function pokemonsLoader() {
  const url = "https://pokeapi.co/api/v2/pokemon";

  async function getPokemons() {
    const response = await fetch(url);
    const json = await response.json();
    await sleep(2000);

    const list = json.results;
    const getId = (url) => url.split("/").filter(Boolean).pop();
    const pokemons = list.map(({ name, url }) => ({ name, id: getId(url) }));
    return pokemons;
  }

  return defer({ pokemonsPromise: getPokemons() });
}

async function pokemonLoader({ request }) {
  const url = new URL(request.url);
  const id = url.pathname.replace("/", "");
  const requestUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const response = await fetch(requestUrl);
  const data = await response.json();

  const name = data.name;
  const imageSrc = data.sprites.front_default;

  console.log(data);
  return json({ name, imageSrc });
}

function Pokemon() {
  const { name, imageSrc } = useLoaderData();

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        padding: "1rem",
        borderRadius: "6px",
      }}
    >
      <h2>{name}</h2>
      <img
        style={{
          minHeight: "2rem",
          minWidth: "2rem",
        }}
        src={imageSrc}
        alt={name}
      />
    </div>
  );
}

Pokemon.loader = pokemonLoader;

function Pokemons() {
  const { pokemonsPromise } = useLoaderData();

  const getActiveStyles = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "",
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <section style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Pokemons</h1>
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <ul style={{ marginLeft: "-1.5rem", marginTop: 0 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={pokemonsPromise}>
              {(pokemons) =>
                pokemons.map((pokemon) => (
                  <li key={pokemon.name}>
                    <NavLink
                      to={pokemon.id}
                      style={getActiveStyles}
                      unstable_viewTransition
                    >
                      {pokemon.name}
                    </NavLink>
                  </li>
                ))
              }
            </Await>
          </Suspense>
        </ul>
        <Outlet />
      </div>
    </section>
  );
}

Pokemons.loader = pokemonsLoader;

export { Pokemons, Pokemon };
