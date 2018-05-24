import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as UserActions from '../actions/UserActions'
import * as PostActions from '../actions/PostActions'
import * as SettingActions from '../actions/SettingActions'

import TimelineContainer from './TimelineContainer'
import CreatePostContainer from './CreatePostContainer'
import LoginContainer from './LoginContainer'


export const HomePageContainer = (props) => {
  const{ isLoggedIn } = props.Settings

  return isLoggedIn ?
    <div className="app__container">
      <TimelineContainer Users={ props.Users } Posts={ props.Posts } FetchPreview={ props.UserActions.fetchPreview } />
      <CreatePostContainer { ...props } CreatePost={ props.PostActions.createPost } />
    </div>
    :
    <LoginContainer { ...props } Settings={ props.Settings } Signup={ props.SettingActions.userSignup } Login={ props.SettingActions.userLogin } Users={ props.Users } />
}

function mapStateToProps(state) {
  return {
    Settings: state.SettingsReducer,
    Users: state.UsersReducer,
    Posts: state.PostsReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(UserActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch),
    SettingActions: bindActionCreators(SettingActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer)
