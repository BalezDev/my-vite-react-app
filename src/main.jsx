import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './components/Navbar/Errorboundary.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback = "An Error has occured">
    <App />
    </ErrorBoundary>
  </React.StrictMode>,
)