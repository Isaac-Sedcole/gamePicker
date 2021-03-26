import React, {useState} from 'react'
import Form from './Form'

const AddUser = (props) => {
    const [showForm, setShowForm] = useState(false)



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
  
  export default AddUser