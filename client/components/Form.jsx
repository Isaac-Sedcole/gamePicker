import React, {useState} from 'react'




const Form = () => {
  const [formData, setFormData] = useState({
      name: '',
      userName: '',
      profileLink: ''
    })
  
    const handleChange = (event) => {
  
      // Note that this setFormData takes a function
      // Do this whenever you set state based on existing state
      setFormData(currentFormData => {
        return {
          ...currentFormData,
          [event.target.name]: event.target.value
        }
      })
    }
  
    const handleSubmit = (event) => {
      event.preventDefault()
  
      //send to new page called <Results/>
      //Display the stats relevant towards that person
      // <Link to /results/{userName}/>
        // props.updateName(formData.name)
      }
    return (
      <>
       <form onSubmit={handleSubmit}>
      {/* {message && <span className="message">{message}</span>} */}
      <h2>User 1:</h2>
      <label> 
        Name: <br></br>
        <input type="text" name="name" placeholder="Isaac" onChange={handleChange} />
      </label>

      <br></br>
      <label>
        Profile Link: <br></br>
        <input type="text" name="profileLink" placeholder="https://steamcommunity.com/id/sedcole/" onChange={handleChange} required/>
      </label>

      <br></br>

        {/* <h2>User{userNumber}:</h2> */}
        {/* userNumber == the number of times person has clicked button to add forms */}
      {/* <label>
        Name:
        <input type="text" name="name" placeholder="Franco" onChange={handleChange} />
      </label>

      <label>
        Username:
        <input type="text" name="userName" placeholder="Licious" onChange={handleChange} />
      </label>
      <label>
        Profile Link:
        <input type="text" name="profileLink" placeholder="https://steamcommunity.com/id/licious116675" onChange={handleChange} required/>
      </label> */}

      {/* add a way to click a + in order to add more of these three
       fields to compare games with more friends/people */}
      {/* <button onClick={addForms}>Add forms</button> */}
      <br></br>
      {/* <button onClick={addUser}>Send</button> */}
      <button>Send</button>
    </form>
      </>
    )
  }
  
  export default Form