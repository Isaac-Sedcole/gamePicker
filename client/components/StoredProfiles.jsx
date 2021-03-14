import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getAllUsers} from '../apis/steam'
import AddUser from './AddUser'
import { connect } from 'react-redux'
import { addCompareList } from '../actions/userList'


const StoredProfiles = (props) => {

  const [compareList, setCompareList] = useState([])
  const [showProfiles, setShowProfiles] = useState(false)
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
    setShowProfiles(!showProfiles)
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
      <section className="hero is-info is-medium-is-bold">
        <div className="hero-body">
        </div>
      </section> 
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
                  <p className="title is-3 has-text-centered">Profiles</p>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <div className="content">
                            <br></br>
                            <br></br>
                            <AddUser loadProfiles={loadProfiles}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
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
                                {showProfiles && profiles.map(profile => {
                                  return (
                                    <div className="column is-one-quarter" key={profile.id}> 
                                      <div className="card">
                                        <div className="card-content">
                                          <div className="media">
                                            <div className="media-content">
                                              <div className="content">
                                                <h3><input type="checkbox" onClick={() => checkBoxHandler(profile)}></input><Link to={`/profiles/${profile.name}`}>{profile.name}</Link></h3>
                                                <ul>
                                                  <li>{profile.profileLink}</li>
                                                </ul>
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
                            <div className="level-item">
                              <Link to="/recommendedgames">Find games in common!</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      </>
    )
  }
  
  export default connect()(StoredProfiles)