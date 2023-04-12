import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import ConnectionProvider from './contexts/ConnectionContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ConnectionProvider>
      <Router>
        <App />
      </Router>
    </ConnectionProvider>
  </React.StrictMode>
)
