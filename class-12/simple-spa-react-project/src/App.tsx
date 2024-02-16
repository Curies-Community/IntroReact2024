import { useState, Component } from 'react'
import Surprise from './Surprise'

import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          {count > 5 && <Surprise />}
        </div>
    </main>
  )
}

export default App
