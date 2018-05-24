import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import SettingsReducer from './SettingsReducer'
import UsersReducer from './UsersReducer'
import PostsReducer from './PostsReducer'


const rootReducer = combineReducers({
  SettingsReducer,
  UsersReducer,
  PostsReducer,
  routing: routerReducer
})

export default rootReducer
