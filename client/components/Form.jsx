import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { addSteamUser } from '../apis/steam'
import { connect } from 'react-redux'
import { fetchUsersAll } from '../actions/allUsers'
import { setShowInvalidModal, setShowPersonModal } from '../actions/modal'
import InvalidSteamProfileModal from "./InvalidSteamProfileModal"
import PersonAlreadyAddedModal from "./PersonAlreadyAddedModal"




const Form = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    profileLink: ''
  })

  const [form, setForm] = useState([
    {
      name:"",
      profileLink:""
    }
  ])

  useEffect(()=> {
    props.dispatch(fetchUsersAll())
  },[])

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
  // console.log(form)

  const handleSubmit = (event) => {
    event.preventDefault()
    let peeps = props.allUsers
    //check for it to be a valid steam user
    //whenever a user is attempted to be added, check if they already exist
    const baseLink = formData.profileLink.substr(0, 27)
    // console.log(baseLink)
    if((baseLink == "https://steamcommunity.com/") && ((formData.profileLink.substr(27,2) == "id") || (formData.profileLink.substr(27, 8) == "profiles")))  {
      if(peeps.filter((person) => person.profileLink == formData.profileLink).length == 0) {
        addSteamUser(formData)
      } else {
        console.log("this person has already been added") 
        props.dispatch(setShowPersonModal(true))
      }
    } else {
      console.log("that is not a valid steam profile link")
      props.dispatch(setShowInvalidModal(true))
      //show modal saying not a valid steam profile link
    }


    // console.log(formData)

    /** 
     * 
     addSteamUser(formData)
     */

    // props.loadProfiles()
    console.log("resetting form")
    setForm([
      {
        name:"",
        profileLink:""
      }
    ])
    setFormData({
      name:"",
      profileLink:""
    })

    //send to new page called <Results/>
    //Display the stats relevant towards that person
    // <Link to /results/{userName}/>
    // props.updateName(formData.name)
  }
  let count = 1
  return (
    <>
      <form onSubmit={handleSubmit}>
        {form.map(item => (
          <>
        <h2>User {count++}:</h2>
          <label>
            Name: <br></br>
            <input type="text" name="name" placeholder="Isaac" onChange={handleChange} value={formData.name}/>
          </label>

          <br></br>
          <label>
            Profile Link: <br></br>
            <input type="text" name="profileLink" placeholder="https://steamcommunity.com/id/sedcole/" onChange={handleChange} value={formData.profileLink} required />
          </label>

          <br></br>
          </>
))}
          <button className="button is-medium is-info is-outlined" onClick={onAddClick}>Add forms</button>
          <br></br>
        <button className="button is-medium is-info is-outlined">Submit</button>
        </form>

        {props.showInvalidModal && <Route path="/" component={InvalidSteamProfileModal} />}
        {props.showPersonModal && <Route path="/" component={PersonAlreadyAddedModal} />}

    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    allUsers: globalState.allUsers,
    showPersonModal: globalState.showPersonModal,
    showInvalidModal: globalState.showInvalidModal
  }
}

export default connect(mapStateToProps)(Form)
