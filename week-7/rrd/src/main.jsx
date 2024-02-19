import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Context from './Context.jsx'
import State from './State.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Context/> */}
    <State/>
  </React.StrictMode>,
)
