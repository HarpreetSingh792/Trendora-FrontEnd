import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../src/styles/main.scss"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './redux/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
