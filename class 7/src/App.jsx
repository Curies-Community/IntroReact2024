import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Pokemons, Pokemon } from "./Pokemons.jsx";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" loader={Pokemons.loader} element={<Pokemons />}>
      <Route path=":id" loader={Pokemon.loader} element={<Pokemon />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export { App };
