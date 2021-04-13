import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setShowInvalidModal } from '../actions/modal'



function InvalidSteamProfileModal(props) {
  const [isActive, setActive] = useState(true)
  // console.log(props)

//   console.log(props.showModal)
//   console.log(props)
//   props.setShowModal(!props.showModal)
//   console.log(props)
  

  const resetModal = () => {
    props.dispatch(setShowInvalidModal(!props.showInvalidModal))
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <button className="" aria-label="" onClick={() => setActive(true)}>Open</button> */}

      <div className={['modal', isActive ? "is-active" : ""].join(' ')}>
        <div className="modal-background"></div>
        <div className="modal-card">
        <section className="modal-card-body has-text-centered">
          <div className="box">
            <p>That is not a valid steam profile link</p>
            <p>Please try again</p>
          </div>    
      <button className="button is-medium is-info is-outlined" onClick={() => setActive(false)} onClick={resetModal}>OK!</button>
    </section>
    </div>
        {/* <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)} onClick={(e) => redirect(e)}></button> */}
      </div>
    </>
  )
}

const mapStateToProps = (globalState) => {
    return {
      showInvalidModal: globalState.showInvalidModal
    }
  }

export default connect(mapStateToProps)(InvalidSteamProfileModal)