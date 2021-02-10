import React, {useState, useEffect} from 'react'
import Form from './Form'
import Games from './Games'
import {GetPlayerSummaries} from '../apis/steam'
import StoredProfiles from './StoredProfiles'


function Home  (props)  {

  const [showProfile, setShowProfile] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [profileVisible, setProfileVisible] = useState(false)

  const fetchSummary = () => {
    GetPlayerSummaries()
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
      <h1>HomePage</h1>
      <div>
      <button onClick={bigFunc}>Show Form</button>
      {showForm && (<Form />)}
      </div>

      <br></br>
      <br></br>

      <button onClick={displayProfile}>Show Profile</button>
      {profileVisible && displayInfo()}

      <br></br>
      <br></br>

      <Games />
      <StoredProfiles/>
      </>
    )
  }
  
  export default Home