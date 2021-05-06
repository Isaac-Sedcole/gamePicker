export const SET_SHOW_MODAL = 'SET_SHOW_MODAL'
export const SET_SHOW_PERSON_MODAL = "SET_SHOW_PERSON_MODAL"
export const SET_SHOW_INVALID_MODAL = "SET_SHOW_INVALID_MODAL"


export function setShowModal(bool) {
  return {
    type: SET_SHOW_MODAL,
    bool
  }
}

export function setShowInvalidModal(bool) {
  return {
    type: SET_SHOW_INVALID_MODAL,
    bool
  }
}

export function setShowPersonModal(bool) {
  return {
    type: SET_SHOW_PERSON_MODAL,
    bool
  }
}
