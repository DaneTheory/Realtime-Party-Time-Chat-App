import * as types from '../constants/actionTypes'


// const newPostCreationPromise = (newPostData) => {
//   return new Promise((resolve, reject) => {
//     if (newPostData.user && newPostData.message) {
//       const postData = {
//         user: newPostData.user,
//         message: newPostData.message
//       }
//       resolve(postData)
//     } else {
//       if(!newPostData.user) {
//         reject(new Error('Invalid User ID provided on submit'))
//       }
//       if(!newPostData.message) {
//         reject(new Error('Invalid User message provided on submit'))
//       }
//     }
//   })
// }

// export const createPost = (newPostData) => {
//   return (dispatch) => {
//     return newPostCreationPromise(newPostData)
//       .then(postData => {
//         postData.id = randomstring.generate({length: 10,charset: 'numeric'})
//         return postData
//       })
//       .then(postData => {
//         postData.ts = timestamp.now()
//         return postData
//       })
//       .then(postData => {
//         console.log(postData)
//         return dispatch({
//           type: types.CREATE_NEW_POST,
//           ...postData
//         })
//       })
//       .catch(e => {
//         console.log('ERROR')
//         console.log(e)
//         return new Error(e)
//       })
//   }
// }

const generatePostID = () => {
  const keys = '0123456789'
  return Number([...keys].map(()=>keys.charAt(Math.floor(Math.random()*10))).join(''))
}

const generateTimestamp = () => {
  return Math.round((new Date()).getTime() / 1000)
}

export const createPost = (postData) => {
  return dispatch => {
    return Promise.resolve(postData)
      .then(submitData => {
        return {
          id: generatePostID(),
          ...submitData,
          ts: generateTimestamp()
        }
      })
      .then(postObj => {
        return dispatch({
          type: types.CREATE_NEW_POST,
          post: postObj
        })
      })
      .catch(e => new Error(e))
  }
}
