import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { GetOwnedGames, GetPlayerSummaries, GetSteamIdByUsername } from '../apis/steam'

const RecommendedGames = (props) => {
  
  const [showLink, setShowLink] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const [games, setGames] = useState([])
  const [gameCount, setGameCount] = useState(0)
  // const [games, setGames] = useState([])


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
    Promise.all(props.userList.map(user => {
      //check if id or profile in profileLink
      //this is the specific part of string where it will say either id or profile
      if(user.profileLink.substr(27, 2) == "id") {
        let username = user.profileLink.substr(30,user.profileLink.length-30)
        if(username[username.length-1] == "/") {
          username = username.substr(0,username.length-1)
        }
        return GetSteamIdByUsername(username)
        .then(steamIdObj => {
          return GetOwnedGames(steamIdObj.response.steamid)
          .then(allOwnedGames => {
            return allOwnedGames.response.games
          })
        })
      } else if(user.profileLink.substr(27, 8) == "profiles") {
        let id = user.profileLink.substr(36,user.profileLink.length-36)
          return GetOwnedGames(id)
          .then(allOwnedGames => {
            return allOwnedGames.response.games
          })
      }else {
        return Promise.resolve()
      }
    }))
    .then((totalGames) => {
      // filter the games

      const games = totalGames.flat()
      // console.log(games.length)

      const reducedGames = games.reduce((games, game) => {
        
        if(!games[game.appid])  {
          games[game.appid] = { ...game, count: 1 }
        } else {
          games[game.appid].count++
        }

        return games
      }, {})

      const filteredGames = Object.values(reducedGames).filter(game => game.count == props.userList.length)
      // console.log(filteredGames.length)
      // console.log(filteredGames)
      setGames(filteredGames)
    })
    }

    

    // console.log(games)
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

  const parsedName = (name) => {
    //every space turns into _
    //every special character is removed
    //specifically look for - and :
    // let name 
    //look for space within name
      for(let i = 0; i < name.length; i++) {
        if(name[i] == ":" || name[i] == "-") {
          name = setCharAt(name, i, "")
          // console.log("second if: ",name)
        }
        if(name[i] == " ") {
          name = setCharAt(name, i, "_")
          // console.log("first if: ",name)
        }
        // console.log(name[7])
      }
      // let ind = name.indexOf(" ")
      // name = setCharAt(name, ind, "_")
      //let slicedName = name.slice(0, ind)
    
      
    
    console.log(name)
    return name
  }

  const setCharAt = (string, index, character) => {
    if(index > string.length-1) return string
    return string.substr(0,index) + character + string.substr(index+1)
  }

  // console.log(props.userList)

  const sendToStorePage = (name) => {


  }

    return (
      <>
      <h1>RecommendedGames</h1>

      {!showLink && props.userList.map(person => {
        return (
          <div key={person.id}>
            <h3 >{person.name}</h3>
          </div>
        )
      })} 

      These are the games you have in common:
      {/* <ul>
        {games.map(game => {
      
          return (
            <>
          <li>{game.appid}</li>
          <li>{game.name}</li>
          </>
        )
          
        })}
      </ul> */}
      <ul>
        {games.map(game => {
          return (
          <li key={game.appid}><img src={"http://media.steampowered.com/steamcommunity/public/images/apps/"+game.appid+"/"+game.img_icon_url+".jpg"}/>
          <a href={"https://store.steampowered.com/app/"+game.appid+"/"+parsedName(game.name)+"/"}>{game.name}</a></li>
          )
        })}
      </ul>

      {/* <a href={"https://store.steampowered.com/app/"+game.appid+"/"+parsedName(game.name)+"/"}> */}
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