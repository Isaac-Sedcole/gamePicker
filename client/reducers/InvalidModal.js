import { SET_SHOW_INVALID_MODAL } from '../actions/modal'

const initialState = false

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_INVALID_MODAL:
      return action.bool
    default:
      return state
  }
}

export default reducer