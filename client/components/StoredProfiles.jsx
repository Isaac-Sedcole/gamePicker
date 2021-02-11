import React, {useState, useEffect} from 'react'
import {getAllUsers} from '../apis/steam'

const StoredProfiles = (props) => {


  const [showProfiles, setShowProfiles] = useState(false)
  const [profiles , setProfiles] = useState([{
    id:null,
    name:'',
    profileLink:''
  }])

  useEffect(() => {
    loadProfiles()
  },[])

  const loadProfiles = () => {
    getAllUsers()
    .then(users => {
      setProfiles(state => {
        const userProfiles = []
        users.map(user => {
          userProfiles.push(user)
          return user
        })
        state = userProfiles
        return state
      })
  })
}

  const handleClick = () => {
    setShowProfiles(!showProfiles)
    loadProfiles()
      
      // let usersd = users.map(user => {
      //   return user
      // })
      // console.log(usersd)
      // console.log(profiles)
    }
 

  // console.log(profiles)

    return (
      <div>
      <h1>StoredProfiles</h1>
      <button onClick={handleClick}>Show all profiles saved in db</button>

      {showProfiles && profiles.map(profile => {
        return (
          <div key={profile.id}> 
          <h3>{profile.name}</h3>
            <ul >
             <li>{profile.profileLink}</li>
        </ul> 
        </div>
      )
      })}

    
      </div>
    )
  }
  
  export default StoredProfiles