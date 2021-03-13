import React, {useState, useEffect} from 'react'
import Form from './Form'
// import Games from './Games'
import {GetPlayerSummaries} from '../apis/steam'
import StoredProfiles from './StoredProfiles'
import AddUser from './AddUser'
import RecommendedGames from './RecommendedGames'
import {Link} from 'react-router-dom'


function Home  (props)  {

  const [showProfile, setShowProfile] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [profileVisible, setProfileVisible] = useState(false)

  const id = "76561198054358315"
  const fetchSummary = () => {
    GetPlayerSummaries(id)
    // GetSteamIdByUsername()
      .then(fetchedPlayerSummary => {
        // console.log(fetchedPlayerSummary)
        setShowProfile(fetchedPlayerSummary)
      })
  }

  useEffect(()=> {
    fetchSummary()
  },[])

  const bigFunc = () => {
    setShowForm(!showForm)
    GetPlayerSummaries()
    .then(fetchedPlayerSummary => {
      setShowProfile(fetchedPlayerSummary)
    })
  }
  
  const displayProfile = () => {
    setProfileVisible(!profileVisible)
  }
  
  
  const displayInfo = () => {
    return (<ul>
      <li>Steam ID: {showProfile.response.players[0].steamid}</li>
      <li>Username: {showProfile.response.players[0].personaname}</li>
      <li>Profile Link: <a href={showProfile.response.players[0].profileurl}>{showProfile.response.players[0].profileurl}</a></li>
      <li>Profile Icon: <img src={showProfile.response.players[0].avatar}/></li>
    </ul>
    )
  }
  
  
  return (
    <>
    <section className="hero is-fullheight is-default is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="row is-vcentered">
            <div className="row is-5">

            <p className="has-text-centered"><Link className="button is-medium is-info is-outlined" to="/">Home</Link></p>
            </div>
            <br></br>
            <br></br>
            <div className="row is-6">

            <h2>external api stuff</h2>
            <button onClick={displayProfile}>Show Profile</button>
            {profileVisible && displayInfo()}
            </div>

            <br></br>
            <br></br> 
            <div className="row is-3">
            <br></br>
            <br></br>
            <h2>internal api stuff</h2>
            <StoredProfiles />
            </div>
            <br></br>
            <br></br>
            <div className="row is-4">

            <h2>combined api stuff</h2>
            <RecommendedGames />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
    )
  }
  
  export default Home