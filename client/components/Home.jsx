import React, {useState, useEffect} from 'react'
import Form from './Form'
import {GetPlayerSummaries} from '../apis/steam'


function Home  (props)  {

  const [showProfile, setShowProfile] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchSummary = () => {
    GetPlayerSummaries()
      .then(fetchedPlayerSummary => {
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
  
  const[profileVisible, setProfileVisible] = useState(false)
  
  
  
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
      {profileVisible && (<p>{showProfile.response.players[0].steamid}</p>)}
    
      </>
    )
  }
  
  export default Home