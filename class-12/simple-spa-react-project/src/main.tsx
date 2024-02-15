import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

const DOM_NODE = document.getElementById('root')
const root = ReactDOM.createRoot(DOM_NODE!)

const ui = (
  <StrictMode>
    <App />
  </StrictMode>

)
root.render(ui)
