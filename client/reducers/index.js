import {combineReducers} from 'redux'

import userList from './userList'
import showProfiles from './showProfiles'
import showModal from './showModal'
import allUsers from './allUsers'
import showInvalidModal from './InvalidModal'
import showPersonModal from './PersonModal'



export default combineReducers({
  showInvalidModal,
  showPersonModal,
  allUsers,
  userList,
  showProfiles,
  showModal
})