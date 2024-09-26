import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppState from './Contexts/AppState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AppState>
    <App />
</AppState>
  </StrictMode>,
)
