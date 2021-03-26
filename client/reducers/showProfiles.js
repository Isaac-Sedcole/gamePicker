import { SHOW_USERS } from '../actions/userList'

const initialState = false

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USERS:
      return action.bool
    default:
      return state
  }
}

export default reducer