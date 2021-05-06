import { SET_USERS_ALL } from '../actions/allUsers'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_ALL:
      return action.users
    default:
      return state
  }
}

export default reducer