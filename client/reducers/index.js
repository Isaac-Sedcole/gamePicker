import {combineReducers} from 'redux'

import userList from './userList'
import showProfiles from './showProfiles'
import showModal from './showModal'


export default combineReducers({
  userList,
  showProfiles,
  showModal
})