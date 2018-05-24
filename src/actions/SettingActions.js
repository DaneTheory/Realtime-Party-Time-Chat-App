import * as types from '../constants/actionTypes'


export const registrationSuccess = (bool) => {
  return dispatch => {
    return dispatch({
      type: types.USER_REGISTRATION_SUCCESS,
      isRegistered: bool
    })
  }
}

export const setActiveUser = (userID) => {
  return dispatch => {
    return dispatch({
      type: types.SET_ACTIVE_USER,
      activeUser: userID
    })
  }
}

export const userSignup = (signUpData) => {
  return dispatch => {
    return Promise.resolve(signUpData)
      .then(data => {
        const key = (data.currUsersArr.length+1).toString(),
          obj = {
              [key]: {
                username: data.username,
                real_name: data.realName,
                verified: data.autoVerify
              }
          }
          dispatch(setActiveUser(key))
          return obj
      })
      .then(data => {
        return dispatch({
          type: types.USER_SIGN_UP,
          newUserData: data
        })
      })
      .then(() => dispatch(registrationSuccess(true)))
      .catch(e => new Error(e))
  }
}

export const userLogin = (loginBool) => {
  return dispatch => {
    return Promise.resolve()
      .then(() => {
        return dispatch({
          type: types.USER_LOG_IN,
          isLoggedIn: loginBool
        })
      })
      .catch(e => new Error(e))
  }
}
