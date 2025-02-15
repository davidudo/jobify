import React from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import './index.css'
import App from './App'
import { AppProvider } from './context/appContext'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)
