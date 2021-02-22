import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { GetOwnedGames, GetPlayerSummaries, GetSteamIdByUsername } from '../apis/steam'

const RecommendedGames = (props) => {
  
  const [showLink, setShowLink] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const [games, setGames] = useState([])
  const [gameCount, setGameCount] = useState(0)


  useEffect(() => {
    if(props.userList.length == 0) {
      setShowLink(true)
    } else {
      setShowLink(false)
    }

    fetchGames()
  }, [])

  const fetchGames = () => {
    //if profileLink == user.profileLink then we have the right person and need their steamid
    //map through props.userlist and for each user call getOwnedGames
    props.userList.map(user => {
      //check if id or profile in profileLink
      //this is the specific part of string where it will say either id or profile
      if(user.profileLink.substr(27, 2) == "id") {
        let username = user.profileLink.substr(30,user.profileLink.length-31)
        GetSteamIdByUsername(username)
        .then(steamIdObj => {
          // console.log(steamIdObj.response.steamid)
          // console.log(steamIdObj)
          GetOwnedGames(steamIdObj.response.steamid)
          .then(allOwnedGames => {
            console.log(allOwnedGames)
            console.log(allOwnedGames.response.game_count)
            // allOwnedGames.games.map(game => {
            //   console.log(game.appid)
            //   console.log(game.name)
            //   console.log(game.playtime_forever)
            //   return null
            })
          })
        }
        return null
      })
        
      }
      // .then(allUsers => {
      //   if(allUsers) {

      //   }
      // })
      // GetOwnedGames(user)
      // .then(games => {
      //   console.log(games.response.game_count)
      // })
    
  

  const handleRedirect = () => {
    setRedirect(true)
  }

  // console.log(props.userList)

    return (
      <>
      <h1>RecommendedGames</h1>
      <ul>

      {!showLink && props.userList.map(person => {
        return (
          <div key={person.id}>
            <h3 >{person.name}</h3>
            <li >{person.profileLink}</li>
          </div>
        )
      })} 
      </ul>
      {showLink && <p> You haven't added anyone! go <button onClick={handleRedirect}>Here!</button> to add people</p> }
    
    {redirect && <Redirect to="/profiles" />}
      {/* 
      Algorithm for sorting which games to recommend first

      goes by tiers, from top to bottom of most to least important factors
      - everyone has to own game
      - playtime forever
      rest is stretch
      - recent review status
      - overall review status
      -
      -
      -
       */}
      </>
    )
  }

  const mapStateToProps = (globalState) => {
    return {
      userList: globalState.userList
    }
  }
  
  export default connect(mapStateToProps)(RecommendedGames)