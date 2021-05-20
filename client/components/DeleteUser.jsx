import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUser } from '../apis/users'
import { getAllUsers } from '../apis/steam'

const DeleteUser = (props) => {

  const [profiles, setProfiles] = useState([{
    id: null,
    name: '',
    profileLink: ''
  }])

  useEffect(() => {
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
  }, [profiles])

  const checkBoxHandler = (profile) => {
    deleteUser(profile.id)
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
                  <br></br>
                  <br></br>
                  <div className="level-item">
                    <div className="columns is-multiline is-centered">
                      {profiles.map(profile => {
                        return (
                          <div className="column is-one-quarter" key={profile.id}>
                            <div className="card">
                              <div className="card-content">
                                <div className="media">
                                  <div className="media-content">
                                    <div className="content">
                                      <label className="checkbox">
                                        <p className="p-6 is-size-3 has-text-weight-semibold"><input className="p-6 m-6" type="checkbox" onClick={() => checkBoxHandler(profile)}></input>{profile.name}</p>

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

const mapStateToProps = (globalState) => {
  return {
    userList: globalState.userList
  }
}

export default connect(mapStateToProps)(DeleteUser)