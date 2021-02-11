import React from 'react'
import {Link} from 'react-router-dom'

const Nav = (props) => {
    return (
      <>
      <h1>Nav</h1>
      <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/profiles`}>Stored Profiles</Link>
          </li>
      </ul>
      </>
    )
  }
  
  export default Nav