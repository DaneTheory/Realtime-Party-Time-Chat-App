import { USER_SIGN_UP, FETCH_IMAGE_PREVIEW } from '../constants/actionTypes'
import InitialState from './InitialState'


const UsersReducer = (state = InitialState.Users, action) => {
  switch (action.type) {
    case USER_SIGN_UP:
      return { ...state, ...action.newUserData }
    case FETCH_IMAGE_PREVIEW:
      return { ...state, imagePreviewSrc: action.imagePreviewSrc }
    default:
      return state
  }
}

export default UsersReducer
