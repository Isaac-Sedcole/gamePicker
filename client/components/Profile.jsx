import React, {useEffect, useState} from 'react'
import {getUserByName} from '../apis/steam'

const Profile = (props) => {
  const name = props.match.params.name

  const [internalAPIuser, setInternalAPIuser] = useState({
    id:null,
    name:"",
    profileLink:""
  })

  useEffect(()=> {
    getUser()
  },[])

  const getUser = () => {
    getUserByName(name)
    .then(user => {
      setInternalAPIuser(user)
    })

  }

  // console.log(internalAPIuser)



    return (
      <>
        <h1>{props.match.params.name}</h1>
        <h3><a href={internalAPIuser.profileLink}>{internalAPIuser.profileLink}</a></h3>
      </>
    )
  }
  
  export default Profile