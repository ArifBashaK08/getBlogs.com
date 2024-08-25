import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextStoreProvider } from './context/ContextStore'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextStoreProvider>
      <App />
    </ContextStoreProvider>
  </React.StrictMode>,
)
