import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getAllUsers} from '../apis/steam'
import AddUser from './AddUser'
import { connect } from 'react-redux'
import { addCompareList, setShowProfiles } from '../actions/userList'


const ActualStoredProfiles = (props) => {

  const [compareList, setCompareList] = useState([])
  const [minProfiles, setMinProfiles] = useState(false)
//   const [compareListHasBeenUpdated, setCompareListHasBeenUpdated] = useState(false)
//   const [showProfiles, setShowProfiles] = useState(false)
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
    // setCompareListHasBeenUpdated(true)
    if(props.userList.length > 0) {
        setMinProfiles(true)
    } else if(props.userList.length < 2) {
        setMinProfiles(false)
    }
  },[compareList])

//   const updateFindCommonGamesButton = () => {
//       if(compareListHasBeenUpdated) {
//         if(props.userList.length > 0) {
//             setMinProfiles(true)
//         } else if(props.userList.length < 1) {
//             setMinProfiles(false)
//         }
//         setCompareListHasBeenUpdated(false)
//       }
    
//   }


  
  
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
    // setShowProfiles(!showProfiles)
    props.dispatch(setShowProfiles(!props.showProfiles))
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
    }
    
    
    
    // let count = 0
  // console.log(profiles)

    return (
      <>
      {/* <section className="hero is-info is-medium-is-bold">
        <div className="hero-body">
        </div>
      </section>  */}
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
                              <button onClick={handleClick}>Show all profiles saved in db</button>
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
    
      </>
    )
  }

  const mapStateToProps = (globalState) => {
    return {
      showProfiles: globalState.showProfiles,
      userList: globalState.userList
    }
  }
  
  export default connect(mapStateToProps)(ActualStoredProfiles)
