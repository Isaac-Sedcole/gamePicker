import React, {useState, useEffect} from 'react'
import Form from './Form'
// import Games from './Games'
import {GetPlayerSummaries} from '../apis/steam'
import StoredProfiles from './StoredProfiles'
import AddUser from './AddUser'
import RecommendedGames from './RecommendedGames'


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
      {/* <h1>HomePage</h1> */}
      <div>
      {/* {showForm && (<Form />)} */}
      {/* <AddUser showForm={showForm} setShowForm={setShowForm}/> */}
      {/* <button onClick={bigFunc}>Show Form</button> */}
      </div>

      <br></br>
      <br></br>
      <h2>external api stuff</h2>
      <button onClick={displayProfile}>Show Profile</button>
      {profileVisible && displayInfo()}

      <br></br>
      <br></br>

      {/* <Games /> */}
      <h2>internal api stuff</h2>
      <StoredProfiles />

      <h2>combined api stuff</h2>
      <RecommendedGames />
      </>
    )
  }
  
  export default Home