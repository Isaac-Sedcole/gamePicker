import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getAllUsers} from '../apis/steam'
import AddUser from './AddUser'
import { connect } from 'react-redux'


const StoredProfiles = (props) => {

  const [compareList, setCompareList] = useState([])
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
      //   return userStoredProfiles
    }

    const checkBoxHandler =  (user) => {
      setCompareList(currentList => {
        let newArr = currentList.filter(person => {
          return user.id != person.id
        })
        return newArr.length == currentList.length 
        ?  [...newArr, user]
        : [...newArr]
      })
      props.dispatch(comparingList(compareList))
    }
 

  // console.log(profiles)

    return (
      <div>
      <AddUser loadProfiles={loadProfiles}/>
      <h1>StoredProfiles</h1>
      <button onClick={handleClick}>Show all profiles saved in db</button>

      {showProfiles && profiles.map(profile => {
        return (
          <div key={profile.id}> 
          <h3><input type="checkbox" onClick={() => checkBoxHandler(profile)}></input><Link to={`/profiles/${profile.name}`}>{profile.name}</Link></h3>
            <ul >
             <li>{profile.profileLink}</li>
        </ul> 
        
        </div>
      )
      })}

    
      </div>
    )
  }
  
  export default connect()(StoredProfiles)