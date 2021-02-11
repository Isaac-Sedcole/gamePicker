import React from 'react'
import Form from './Form'

const AddUser = (props) => {

    const handleClick = () => {

    }
    return (
      <>
      <h2>Add a user to the db</h2>
      <button onClick={() => props.setShowForm(!props.showForm)}>Show Form</button>
      {props.showForm && (<Form />)}
      </>
    )
  }
  
  export default AddUser