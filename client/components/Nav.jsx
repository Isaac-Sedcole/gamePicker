import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const Nav = (props) => {

  const [burgerVisible, setBurgerVisible] = useState(false)

  const toggleBurger = () => {
    setBurgerVisible(currentBurgerState => {
      return !currentBurgerState
    })
  }


    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <Link to="/">
                <h1>Game Picker</h1>
              </Link>
            </div>
            <span onClick={toggleBurger} className={`navbar-burger burger ${burgerVisible ? 'is-active' : ''}`} data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>

            </span>
          </div>
          <div id="navbarMenuHeroA" className={`navbar-menu ${burgerVisible ? "is-active" : ""}`}>
          <div className="navbar-end">
          <Link onClick={toggleBurger} className="navbar-item" to={`/`}>Home</Link>
          
          <Link onClick={toggleBurger} className="navbar-item" to={`/profiles`}>Stored Profiles</Link>

          </div>

          </div>
        </div>
      </nav>
    )
  }
  
  export default Nav