
import React, {useEffect, useState} from 'react'
import {GetSteamIdByUsername} from '../apis/steam'

const Games = (props) => {

  const [games, setGames] = useState(null)
  const [showGames, setShowGames] = useState(false)
  const [ids, setIds] = useState([
    {
      id: ""
    }
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    GetSteamIdByUsername()
      .then(fetchedId => {
        setIds(currentId => {
          // console.log(fetchedId)
          // console.log("these are the ids ",ids)
          return [
            ...currentId,
            {id: fetchedId}
          ]
        })
      })
  }

  const bigFunc = () => {
    setShowGames(!showGames)
    GetSteamIdByUsername()
    .then(fetchedId => {
      setIds(fetchedId)
    })
  }

  const displayInfo = () => {
    (<p>{ids.response.steamid}</p>)
  }


    return (
      <>
      <button onClick={bigFunc}>Show Games (doesnt work) </button>
      {showGames && displayInfo()}
      {/* <ul>
              <li>
                  <Link to `store.steampowered.com/app/{appid}/{gameName}/> - gameName is has space is _
              </li>
          </ul> */}
     
      </>
    )
  }
  
  export default Games
