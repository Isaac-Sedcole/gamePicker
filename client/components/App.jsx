import React from 'react'
import {Route} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import StoredProfiles from './StoredProfiles'
import Profile from './Profile'
// import Games from './Games'
import RecommendedGames from './RecommendedGames'

function App ()  {
  
  return (
    <>
    <h1>React development has begun!</h1>
    <Nav />
    <div>
    <Route path="/" exact component={Home} />
    <Route path="/profiles" exact component={StoredProfiles}/>
    <Route path="/profiles/:name" exact component={Profile} />
    <Route path="/recommendedgames" exact component={RecommendedGames} />
    
    {/* <Route path="/:rank" exact component={Classifications} /> */}
    </div>
    </>
  )
}

export default App
