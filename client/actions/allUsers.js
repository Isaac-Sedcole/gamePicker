import {getAllUsers} from '../apis/steam'

export const SET_USERS_ALL = 'SET_USERS'

export function setUsersAll(users) {
  return {
    type: SET_USERS_ALL,
    users
  }
}

export function fetchUsersAll() {
  return dispatch => {
    return getAllUsers()
    .then(users => {
      dispatch(setUsersAll(users))
      return null
    })
  }
}