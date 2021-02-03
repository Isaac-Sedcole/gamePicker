import React from 'react'
<<<<<<< HEAD

const App = () => {
  return (
    <h1>React development has begun!</h1>
=======
import {Route} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'

function App ()  {
  
  return (
    <>
    <h1>React development has begun!</h1>
    <Nav />
    <div>
    <Route path="/" exact component={Home} />
    {/* <Route path="/:rank" exact component={Classifications} /> */}
    </div>
    </>
    
>>>>>>> boilerplate-react-webpack/Isaac
  )
}

export default App
