import { CREATE_NEW_POST, FETCH_IMAGE_PREVIEW } from '../constants/actionTypes'
import InitialState from './InitialState'


const PostsReducer = (state = InitialState.Posts, action) => {
  switch (action.type) {
    case CREATE_NEW_POST:
      return state.concat(action.post)
    default:
      return state
  }
}

export default PostsReducer
