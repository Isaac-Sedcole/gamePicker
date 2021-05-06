import React, {useState, useEffect} from 'react'
import Form from './Form'
import {fetchUsersAll} from '../actions/allUsers'
import { connect } from 'react-redux'

const AddUser = (props) => {
    const [showForm, setShowForm] = useState(false)

    // useEffect(()=> {
    //   props.dispatch(fetchUsersAll())
    // },[])



    const handleClick = () => {
      setShowForm(!showForm)
    }
    return (
      
          <div className="media-content has-text-centered">
      {/* <> */}
      {/* <div className="article"> */}
        {/* <div className="media"> */}



      {/* <h2>Add a user to the db</h2> */}
      <button className="button is-medium is-info is-outlined" onClick={handleClick}>Click to Add someone</button>
      {showForm && (<Form loadProfiles={props.loadProfiles()}/>)}
      {/* </> */}
      {/* </div> */}
    {/* </div> */}
          </div>
    )
  }
  
  export default connect()(AddUser)