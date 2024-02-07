/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createBrowserRouter, RouterProvider, Link, useParams, useLoaderData, defer, Await, Outlet } from "react-router-dom"
import { Suspense } from "react"

function Loading() {
  return <div style={{ backgroundColor: "blue" }}>Loading...</div>
}
function Song() {
  const params = useParams()
  // @ts-ignore
  const { albumPromise, artistPromise } = useLoaderData()

  if (params.song_id === "error") {
    throw new Error("cancion no encontrada")
  }

  return (
    <div style={{backgroundColor: "yellow"}}>
      <div>{params.song_id}</div>
      <Suspense fallback={<Loading />}>
        <Await resolve={albumPromise}>
          {album => <div>Album: {album}</div>}
        </Await>
        <Await resolve={artistPromise}>
          {artist => <div>Artist: {artist}</div>}
        </Await>
      </Suspense>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <section style={{ backgroundColor: "#67e8f9", padding: "2rem", borderRadius: 6 }}>
        <h1>Home</h1>
        <Link to="/about">ir a about</Link>
        <br />
        <Link to="/songs">ir a songs</Link>
        <br />
        <Link to="/otro">ir a otro</Link>
        <br />
      </section>
    ),
    errorElement: (
      <section style={{ backgroundColor: "#fb7185", padding: "2rem", borderRadius: 6 }}>
        <h1>Error page</h1>
        <Link to="/">ir a home</Link>
      </section>
    )
  },
  {
    path: "/about",
    element: (
      <section>
        <h1>About</h1>
        <button>contactame</button>
      </section>
    )
  },
  {
    path: "/songs/",
    element: (
      <section style={{ backgroundColor: "#6ee7b7", padding: "2rem", borderRadius: 6 }}>
        <h1>Songs</h1>
        <ul>
          <li>
            <Link to="/songs/little">little photon</Link>
          </li>
          <li>
            <Link to="/songs/war">war</Link>
          </li>
          <li>
            <Link to="/songs/shadow">Shadows on mine</Link>
          </li>
          <li>
            <Link to="/songs/mago">Costa del silencio</Link>
          </li>
        </ul>
        <Outlet />
      </section>
    ),
    children: [
      {
        path: ":song_id",
        element: (<Song />),
        loader: async () => {
          const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

          async function getAlbum() {
            await sleep(2000)
            return "melody sheep"
          }

          async function getArtist() {
            await sleep(4000)
            return "pink floyd"
          }

          return defer({ albumPromise: getAlbum(), artistPromise: getArtist() })
        },
        errorElement: (
          <span>cancion no encontrada</span>
        )
      },
    ]
  },

])

function App() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
