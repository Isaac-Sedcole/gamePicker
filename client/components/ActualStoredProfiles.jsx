import React, {useState, useEffect} from 'react'
import { Link, Route } from 'react-router-dom'
import {getAllUsers, GetSteamIdByUsername, GetOwnedGames} from '../apis/steam'
import AddUser from './AddUser'
import { connect } from 'react-redux'
import { addCompareList, setShowProfiles } from '../actions/userList'
import AddPersonModal from './AddPersonModal'
import { setShowModal } from '../actions/modal'



const ActualStoredProfiles = (props) => {

  const [compareList, setCompareList] = useState([])
  const [minProfiles, setMinProfiles] = useState(false)
//   const [showModal, setShowModal] = useState(false)
  const [profiles , setProfiles] = useState([{
    id:null,
    name:'',
    profileLink:''
  }])
  
  useEffect(() => {
    loadProfiles()
  },[])
  
  useEffect(() => {
    props.dispatch(addCompareList(compareList))

    if(compareList.length > 1) {
        setMinProfiles(true)
    } else if(compareList.length < 2) {
        setMinProfiles(false)
    }
  },[compareList])




  
  
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
    props.dispatch(setShowProfiles(!props.showProfiles))
    loadProfiles()
    }
    
    const checkBoxHandler =  (user) => {
        //testing for checking if private games library
        //----------------------------
        //getting username from vanityURL in its pure form
        //if user already exists in currentList
        if(compareList.filter(e => e.name == user.name).length < 1){
          if(user.profileLink.substr(27, 2) == "id") {
            let username = user.profileLink.substr(30,user.profileLink.length-30)
            if(username[username.length-1] == "/") {
              username = username.substr(0,username.length-1)
            }
            //using the username to return the steam ID
            GetSteamIdByUsername(username)
            .then(steamIdObj => {
              GetOwnedGames(steamIdObj.response.steamid)
              .then(allOwnedGames => {
                //if the persons profile is private
                if(allOwnedGames.response.games == undefined) {
                  props.dispatch(setShowModal(true))
                  
                }
              })
            })
          } else if(user.profileLink.substr(27, 8) == "profiles") {
            let id = user.profileLink.substr(36,user.profileLink.length-36)
            GetOwnedGames(id)
            .then(allOwnedGames => {
              //if the persons profile is private
              if(allOwnedGames.response.games === undefined) {
                props.dispatch(setShowModal(true))
              }
            })
          }
        }
          

        //-------------------------------
      setCompareList(currentList => {
        let newArr = currentList.filter(person => {
          return user.id != person.id
        })
        return newArr.length == currentList.length 
        ?  [...newArr, user]
        : [...newArr]
      })
    }
    
    
    
  

    return (
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
        <br></br>
        <br></br>
        <br></br>
      <section className="articles">
                <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <div className="content ">
                            <div className="level-item">
                                <p className="title is-3">StoredProfiles</p>
                            </div>
                            <div className="level-item">
                              <button className="button is-medium is-info is-outlined" onClick={handleClick}>Show all profiles </button>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="level-item">
                              <div className="columns is-multiline is-centered">
                                {props.showProfiles && profiles.map(profile => {
                                  return (
                                    <div className="column is-one-quarter" key={profile.id}> 
                                      <div className="card">
                                        <div className="card-content">
                                          <div className="media">
                                            <div className="media-content">
                                              <div className="content">
                                                  <label className="checkbox">
                                                    <h3><input type="checkbox" onClick={() => checkBoxHandler(profile)}></input>{profile.name}</h3>
                                                  
                                                  </label>
                                                {/* <Link to={`/profiles/${profile.name}`}>{profile.name}</Link></h3> */}
                                                {/* <ul>
                                                  <li>{profile.profileLink}</li>
                                                </ul> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                              <br></br>
                              <br></br>
                            </div>
                            {minProfiles && 
                                <div className="level-item">
                                    <Link className="button is-medium is-info is-outlined " to="/recommendedgames">Find games in common!</Link>
                                </div>
                            }
                            {!minProfiles && 
                                <div className="level-item">
                                <Link className="button is-medium is-info is-outlined " disabled to="#">Find games in common!</Link>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
      </section>
      { props.showModal && 
      <>
      {/* <AddPersonModal showModal={showModal} setShowModal={setShowModal}/> */}
      <Route path="/" component={AddPersonModal} />
      </>
      }
    
      </>
    )
  }

  const mapStateToProps = (globalState) => {
    return {
      showProfiles: globalState.showProfiles,
      showModal: globalState.showModal
    }
  }
  
  export default connect(mapStateToProps)(ActualStoredProfiles)
