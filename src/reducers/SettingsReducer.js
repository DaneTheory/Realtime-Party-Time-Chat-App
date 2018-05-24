import { USER_REGISTRATION_SUCCESS, SET_ACTIVE_USER, USER_SIGN_UP, USER_LOG_IN } from '../constants/actionTypes'
import InitialState from './InitialState'


const SettingsReducer = (state = InitialState.Settings, action) => {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS:
      return { ...state, isRegistered: action.isRegistered }
    case SET_ACTIVE_USER:
      return { ...state, activeUser: action.activeUser }
    case USER_LOG_IN:
      return { ...state, isLoggedIn: action.isLoggedIn }
    default:
      return state
  }
}

export default SettingsReducer
