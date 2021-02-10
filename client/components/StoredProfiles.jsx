import React, {useState} from 'react'
import {getAllUsers} from '../apis/steam'

const StoredProfiles = (props) => {


  const [showProfiles, setShowProfiles] = useState(false)
  const [profiles , setProfiles] = useState(
    [
      {
        id: "",
        name: "",
        profileLink: ""
      }
    ]
  )

  const handleClick = () => {
    setShowProfiles(!showProfiles)
    getAllUsers()
    .then(users => {
      setProfiles(profiles.push(users))
      console.log("profiles: ",profiles)
      console.log("users: ", users)
    })
  }

    return (
      <>
      <h1>StoredProfiles</h1>
      <button onClick={handleClick}>Show all profiles saved</button>

      {showProfiles && profiles.map(profile => {
        <p>{profile.name}</p>
      })}
      {/* 
      Stores profiles and allows you to select them in tickboxes and click submit to compare
      games and show the recommended ones owned between all people
      */}
      </>
    )
  }
  
  export default StoredProfiles