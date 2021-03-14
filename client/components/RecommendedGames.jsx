import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { GetOwnedGames, GetPlayerSummaries, GetSteamIdByUsername } from '../apis/steam'

const RecommendedGames = (props) => {
  
  const [showLink, setShowLink] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [showSelected, setShowSelected] = useState(false)
  const [recommendedGames, setRecommendedGames] = useState([])
  const [showRecommended, setShowRecommended] = useState(false)


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
    })) //promise.all means the entire thing will wait before running then - make sure to return all
    //async related things
    .then((totalGames) => {

      const games = totalGames.flat()

      const reducedGames = games.reduce((games, game) => {
        
        if(!games[game.appid])  {
          games[game.appid] = { ...game, count: 1 }
        } else {
          games[game.appid].count++
        }

        return games
      }, {})

      const filteredGames = Object.values(reducedGames).filter(game => game.count == props.userList.length)
      const filteredRecommendedGames = Object.values(reducedGames).filter(game => game.count == (props.userList.length -1))
      
      // console.log(filteredGames.length)
      // console.log(filteredGames)
      setGames(filteredGames)
      setRecommendedGames(filteredRecommendedGames)
    })
    } 
  
  const handleRedirect = () => {
    setRedirect(true)
  }

  const parsedName = (name) => {
      for(let i = 0; i < name.length; i++) {
        if(name[i] == ":" || name[i] == "-") {
          name = setCharAt(name, i, "")
        }
        if(name[i] == " ") {
          name = setCharAt(name, i, "_")
        }
      }
    // console.log(name)
    return name
  }

  const setCharAt = (string, index, character) => {
    if(index > string.length-1) return string
    return string.substr(0,index) + character + string.substr(index+1)
  }

  const handleRandomGameSelector = () => {
    let randoNumba = getRandomInt(games.length - 1)
    let selectedGameLocal = null
    for(let i = 0; i<games.length;i++) {
      if(randoNumba == i) {
        selectedGameLocal = games[i]
      }
    }
    // console.log(selectedGameLocal)
    setSelectedGame(selectedGameLocal)
    setShowSelected(true)
  }

  const getRandomInt = (max) => {
    let min = 0
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const handleShowRecommended = () => {
    setShowRecommended(!showRecommended)
  }

    return (
      <>

      <br></br>
      <br></br>
      <br></br>
    

      <h1>Recommended Games</h1>

      {!showLink && props.userList.map(person => {
        return (
          <div key={person.id}>
            <h3 >{person.name}</h3>
          </div>
        )
      })}
      {!showLink && <div>You have: {games.length} games in common
        <br></br>
        <br></br>
        {!showLink && <button onClick={handleRandomGameSelector}>Choose a random game for me</button>}
        <br></br>
        <br></br>
        {showSelected && <h3>{selectedGame.name}</h3>}
        <br></br>
        <br></br>
        <button onClick={handleShowRecommended}>Show recommended games ({recommendedGames.length}) (most people own these):</button>
        <br></br>
        
       
        {showRecommended && 
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <section className="articles">      
                  <p className="title is-3 has-text-centered">These are the recommended games (all but one person owns these):</p>
                  <div className="level-item">
                  <div className="columns is-multiline is-centered">

        {showRecommended && recommendedGames.map(game => {
          return (
            <div className="column is-2 is-narrow" key={game.appid}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <div className="content">
                        <img src={"http://media.steampowered.com/steamcommunity/public/images/apps/"+game.appid+"/"+game.img_icon_url+".jpg"}/>
                        <a href={"https://store.steampowered.com/app/"+game.appid+"/"+parsedName(game.name)+"/"}>{game.name}</a>
                      </div>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
            )
          })}
          </div>
          </div>
              </section> 
          </>
          }

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <section className="articles">
          <p className="title is-3 has-text-centered">These are the games you have in common:</p>
          <div className="level-item">
            <div className="columns is-multiline is-centered">
              {games.map(game => {
                return (
                  <div className="column is-2 is-narrow" key={game.appid}>
                    <div className="card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <div className="content">
                              <img src={"http://media.steampowered.com/steamcommunity/public/images/apps/"+game.appid+"/"+game.img_icon_url+".jpg"}/>
                              <a href={"https://store.steampowered.com/app/"+game.appid+"/"+parsedName(game.name)+"/"}>{game.name}</a>
                            </div>
                          </div>
                        </div> 
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>             
      </div>
      
      
}
      {showLink && <p> You haven't added anyone! go <button onClick={handleRedirect}>Here!</button> to add people</p> }
    
    {redirect && <Redirect to="/profiles" />}
      </>
    )
  }

  const mapStateToProps = (globalState) => {
    return {
      userList: globalState.userList
    }
  }
  
  export default connect(mapStateToProps)(RecommendedGames)