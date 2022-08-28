import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { GetOwnedGames, GetPlayerSummaries, GetSteamIdByUsername, getAllUsers } from '../apis/steam'

const Games = (props) => {
  
  const [redirect, setRedirect] = useState(false)
  const [homeRedirect, setHomeRedirect] = useState(false)
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [showSelected, setShowSelected] = useState(false)

  const [profiles , setProfiles] = useState([{
    id:null,
    name:'',
    profileLink:''
  }])
  const [showGame, setShowGame] = useState(false)
  const [currentlySelectedGame, setCurrentlySelectedGame] = useState(null)
  const [listOfPeopleWhoOwnGame, setListOfPeopleWhoOwnGame] = useState([])
  const [checkboxChecked, setCheckBoxChecked] = useState(false)
  const [showLoadGames, setShowLoadGames] = useState(true)
  const [showGames, setShowGames] = useState(false)

  useEffect(() => {
    loadProfiles()
    setCurrentlySelectedGame(null)
  }, [])

  // useEffect(()=> {
  //   // console.log('temp useEffect')
  //   // console.log(profiles)
  //   fetchGames()
  // },[profiles])

  

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

  const resetButton = () => {
    setCheckBoxChecked(false)
    setCurrentlySelectedGame(null)
    setListOfPeopleWhoOwnGame([])
    setShowGames(true)
  }

  const loadGames = () => {
    // console.log(profiles)
    fetchGames()
    setShowLoadGames(false)
    setShowGames(true)
    setShowGame(true)
  }

  const fetchGames = () => {

    //if profileLink == user.profileLink then we have the right person and need their steamid
    //map through props.userlist and for each user call getOwnedGames
    Promise.all(profiles.map(user => {
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
      // setGames(totalGames)
      // return console.log(totalGames)
      // console.log("this one",totalGames)
      const games = totalGames.flat()
      const reducedGames = games.reduce((games, game) => {
        
        if(!games[game.appid])  {
          games[game.appid] = { ...game, count: 1 }
        } else {
          games[game.appid].count++
        }

        return games
      }, {})

      const filteredGames = Object.values(reducedGames).filter(game => {
        if(!(game.img_icon_url == "" || game.img_logo_url == "")){
          return game
        }
      })
        
  
      filteredGames.sort((a,b) => {
        let textA = a.name.toUpperCase()
        let textB = b.name.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })

      setGames(filteredGames)

      // console.log(filteredGames.length)
      // console.log(filteredGames)
      // console.log(filteredGames)
      // let newArrr = filteredGames.filter(game => {
      //   if(!(game.img_icon_url == "" || game.img_logo_url == "")) {
      //     return game
      //   }
      // })
      // console.log(newArrr)
      // console.log(newArrr.length)
    })
  }
    
  
  const handleRedirect = () => {
    setRedirect(true)
  }

  const handleRedirectHome = () => {
    setHomeRedirect(true)
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

  const checkBoxHandler = (specificGame) => {
    setShowGames(false)
    if(specificGame.appid == checkboxChecked.gameId){
      setCheckBoxChecked(!checkboxChecked)
    } else {
      setCheckBoxChecked(true)
    }

    if(currentlySelectedGame == specificGame) {
      setCurrentlySelectedGame(null)
    } else {
      setCurrentlySelectedGame(specificGame)
    }

    profiles.map(user => {
      //check if id or profile in profileLink
      //this is the specific part of string where it will say either id or profile
      if(user.profileLink.substr(27, 2) == "id") {
        let username = user.profileLink.substr(30,user.profileLink.length-30)
        if(username[username.length-1] == "/") {
          username = username.substr(0,username.length-1)
        }
        GetSteamIdByUsername(username)
        .then(steamIdObj => {
          GetOwnedGames(steamIdObj.response.steamid)
          .then(allOwnedGames => {
            // console.log(user.name)
            // allOwnedGames.response.games
            for(let i = 0; i< allOwnedGames.response.games.length; i++){
              if(allOwnedGames.response.games[i].appid == specificGame.appid){
                setListOfPeopleWhoOwnGame(currentList => {
                  // console.log([...currentList, {name: user.name}])
                  return [...currentList, {name: user.name}]
                })
              }
            }
          })
        })
      } else if(user.profileLink.substr(27, 8) == "profiles") {
        let id = user.profileLink.substr(36,user.profileLink.length-36)
          GetOwnedGames(id)
          .then(allOwnedGames => {
            allOwnedGames.response.games.map(game => {
              if (game.appid == specificGame.appid) {
                 setListOfPeopleWhoOwnGame(currentList => {
                  return [...currentList, {name: user.name}]
                })
              }
            })
          })
        }

      })

  }


    return (
      <div className="mx-3">

      <br></br>
      <br></br>
      <br></br>
    

      <h1>All Games</h1>
      
        <br></br>
        <br></br>
        { showGame && <button onClick={handleRandomGameSelector}>Choose a random game for me</button>}
        <br></br>
        <br></br>
        {showSelected && <h3><a target="_blank" rel="noopener noreferrer" href={"https://store.steampowered.com/app/"+selectedGame.appid+"/"+parsedName(selectedGame.name)+"/"}>{selectedGame.name}</a></h3>}
        <br></br>
        {currentlySelectedGame && <> <p>All these people own </p> <img src={"http://media.steampowered.com/steamcommunity/public/images/apps/"+currentlySelectedGame.appid+"/"+currentlySelectedGame.img_icon_url+".jpg"}/>
                                     <a target="_blank" rel="noopener noreferrer" href={"https://store.steampowered.com/app/"+currentlySelectedGame.appid+"/"+parsedName(currentlySelectedGame.name)+"/"}>{currentlySelectedGame.name}</a>:
        {listOfPeopleWhoOwnGame.map(person => {
          return (<p key={person.name}>{person.name}</p>)
        })} 
        <button onClick={resetButton}>Reset!</button>
        </>} 
        <br></br>
        {showLoadGames && <button onClick={loadGames}>Load games</button>}
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
        <br></br>
        <br></br>

        { showGame &&
        <section className="articles">
        

          {showGames && <p className="title is-3 has-text-centered">These are the games everyone owns</p>}
          <div className="level-item">
            <div className="columns is-multiline is-centered">
              {showGames && games.map(game => {
                return (
                  <div className="column is-2 is-narrow" key={game.appid}>
                    <div className="card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <div className="content">
                              <input className="p-6 m-6" type="radio" checked={checkboxChecked} onChange={() => checkBoxHandler(game)}></input>
                              <img src={"http://media.steampowered.com/steamcommunity/public/images/apps/"+game.appid+"/"+game.img_icon_url+".jpg"}/>
                              <a target="_blank" rel="noopener noreferrer" href={"https://store.steampowered.com/app/"+game.appid+"/"+parsedName(game.name)+"/"}>{game.name}</a>
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
        }        
        {/* {showLink && <p> You haven't added anyone! go <button onClick={handleRedirect}>Here!</button> to add profiles</p> } */}
        {/* {showLink && <p> Or go <button onClick={handleRedirectHome}>Here!</button> to select profiles</p> } */}
  
      {redirect && <Redirect to="/profiles" />}
      {homeRedirect && <Redirect to="/" />}
      </div>
      
      

      // </div>
    )
  }

 
  
  export default Games