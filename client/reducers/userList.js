import { SET_USERS, ADD_COMPARE_LIST } from '../actions/userList'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case ADD_COMPARE_LIST:
      return action.compareList
    default:
      return state
  }
}

export default reducer