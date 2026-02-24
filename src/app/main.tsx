import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./styles/global.css";
import App from './App.tsx'

console.log("RUNNING src/app/main.tsx");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
