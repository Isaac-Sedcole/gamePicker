import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUser } from '../apis/users'

const DeleteUser = (props) => {



    return (
      <>
       {props.userList.map(person => {
        return (
          <div key={person.id}>
            <h3 >{person.name}</h3>
          </div>
        )
      })}
      </>
    )
  }

  const mapStateToProps = (globalState) => {
    return {
      userList: globalState.userList
    }
  }
  
  export default connect(mapStateToProps)(DeleteUser) 