import {combineReducers} from 'redux'

import userList from './userList'
import showProfiles from './showProfiles'


export default combineReducers({
  userList,
  showProfiles
})