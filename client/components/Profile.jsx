import React, {useEffect, useState} from 'react'
import {getUserByName} from '../apis/steam'
import { GetOwnedGames, GetPlayerSummaries, GetSteamIdByUsername } from '../apis/steam'


const Profile = (props) => {
  const name = props.match.params.name

  // const [internalAPIuser, setInternalAPIuser] = useState({
  //   id:null,
  //   name:"",
  //   profileLink:""
  // })

  useEffect(()=> {
    // fetchGames()
  },[])

  

  // if(user.profileLink.substr(27, 2) == "id") {
  //   let username = user.profileLink.substr(30,user.profileLink.length-30)
  //   if(username[username.length-1] == "/") {
  //     username = username.substr(0,username.length-1)
  //   }
  //   return GetSteamIdByUsername(username)
  //   .then(steamIdObj => {
  //     return GetOwnedGames(steamIdObj.response.steamid)
  //     .then(allOwnedGames => {
  //       return allOwnedGames.response.games
  //     })
  //   })
  // } else if(user.profileLink.substr(27, 8) == "profiles") {
  //   let id = user.profileLink.substr(36,user.profileLink.length-36)
  //     return GetOwnedGames(id)
  //     .then(allOwnedGames => {
  //       return allOwnedGames.response.games
  //     })
  // }

  console.log(props.match.params)



    return (
      <>
        <br></br>
        <br></br>
        <br></br>
        <h1>{props.match.params.name}</h1>
        {/* <h3><a href={internalAPIuser.profileLink}>{internalAPIuser.profileLink}</a></h3> */}



      </>
    )
  }
  
  export default Profile