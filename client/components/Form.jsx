import React, { useState } from 'react'




const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    profileLink: ''
  })

  const [form, setForm] = useState([
    {
      name:"",
      profileLink:""
    }
  ])

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

  const onAddClick = () => {
    setForm(currentForm => {
      return [...currentForm,
        {name: ""}
      ]
    })
  }
  console.log(form)

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
        {form.map(item => (
        <>
        {/* {key=item.id} */}
        <h2>User 1:</h2>
          <label>
            Name: <br></br>
            <input type="text" name="name" placeholder="Isaac" onChange={handleChange} value={item.name} />
          </label>

          <br></br>
          <label>
            Profile Link: <br></br>
            <input type="text" name="profileLink" placeholder="https://steamcommunity.com/id/sedcole/" onChange={handleChange} value={item.profileLink} required />
          </label>

          <br></br>
          </>
))}
      {/* <h2>User 1:</h2>
          <label>
          Name: <br></br>
          <input type="text" name="name" placeholder="Isaac" onChange={handleChange} />
          </label>
          
          <br></br>
          <label>
          Profile Link: <br></br>
          <input type="text" name="profileLink" placeholder="https://steamcommunity.com/id/sedcole/" onChange={handleChange} required />
          </label>
          
          <br></br>
           */}
          <button onClick={onAddClick}>Add forms</button>
          <br></br>
        <button>Send</button>
        </form>
    </>
  )
}

export default Form