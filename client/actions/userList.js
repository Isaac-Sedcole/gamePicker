import {getAllUsers} from '../apis/steam'

export const SET_USERS = 'SET_USERS'
export const ADD_COMPARE_LIST = 'ADD_COMPARE_LIST' 

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  }
}

export function fetchUsers() {
  return dispatch => {
    return getAllUsers()
    .then(users => {
      dispatch(setUsers(users))
      return null
    })
  }
}

export function addCompareList(compareList) {
  return {
    type: ADD_COMPARE_LIST,
    compareList
  }
}