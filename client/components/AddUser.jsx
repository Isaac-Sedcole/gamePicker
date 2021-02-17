import React, {useState} from 'react'
import Form from './Form'

const AddUser = (props) => {
    const [showForm, setShowForm] = useState(false)



    const handleClick = () => {
      setShowForm(!showForm)
    }
    return (
      <>
      <h2>Add a user to the db</h2>
      <button onClick={handleClick}>Show Form</button>
      {showForm && (<Form loadProfiles={props.loadProfiles()}/>)}
      </>
    )
  }
  
  export default AddUser