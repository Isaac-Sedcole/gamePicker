import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getAllUsers} from '../apis/steam'
import AddUser from './AddUser'
import { connect } from 'react-redux'
import { addCompareList, setShowProfiles } from '../actions/userList'


const ActualStoredProfiles = (props) => {

  const [compareList, setCompareList] = useState([])
  const [minProfiles, setMinProfiles] = useState(false)
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
      showProfiles: globalState.showProfiles
    }
  }
  
  export default connect(mapStateToProps)(ActualStoredProfiles)
