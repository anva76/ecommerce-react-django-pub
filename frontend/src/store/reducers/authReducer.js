import {
  LOGIN_IN_PROGRESS,
  LOGIN_DONE,
  LOGIN_ERROR,
  UPDATE_AUTH,
  REGISTRATION_IN_PROGRESS,
  REGISTRATION_DONE,
  REGISTRATION_ERROR,
} from "../actions/actions"

const authReducer = (state, action) => {
  if (action.type === LOGIN_IN_PROGRESS) {
    return {
      ...state,
      authInProgress: true,
      authError: false,
    }
  }
  if (action.type === LOGIN_ERROR) {
    return {
      ...state,
      authInProgress: false,
      authError: true,
    }
  }
  if (action.type === LOGIN_DONE) {
    const newState = {
      ...state,
      token: action.payload.token,
      userName: action.payload.user.name,
      userEmail: action.payload.user.email,
      authInProgress: false,
      isAuthenticated: true,
    }

    const storageObj = {
      token: newState.token,
      userName: newState.userName,
      userEmail: newState.userEmail,
    }

    sessionStorage.setItem("_sessdt", JSON.stringify(storageObj))

    return newState
  }

  if (action.type === UPDATE_AUTH) {
    return action.payload
  }

  if (action.type === REGISTRATION_IN_PROGRESS) {
    return {
      ...state,
      regInProgress: true,
      regError: false,
    }
  }
  if (action.type === REGISTRATION_ERROR) {
    return {
      ...state,
      regInProgress: false,
      regError: true,
    }
  }
  if (action.type === REGISTRATION_DONE) {
    return {
      ...state,
      regInProgress: false,
    }
  }

  throw new Error(`authReducer: Undefined action type - "${action.type}"`)
}

export default authReducer
