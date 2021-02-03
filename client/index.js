import React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< HEAD
=======
import {HashRouter as Router} from 'react-router-dom'
>>>>>>> boilerplate-react-webpack/Isaac

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
<<<<<<< HEAD
    <App />,
=======
    <Router>
      <App />
    </Router>,
>>>>>>> boilerplate-react-webpack/Isaac
    document.getElementById('app')
  )
})
