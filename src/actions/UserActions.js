import axios from 'axios'

import * as types from '../constants/actionTypes'
import Configs from '../Configs/Configs'

export function fooUser(bar) {
  return function (dispatch) {
    return dispatch({
      type: types.FOO_BAR,
      baz: bar
    })
  }
}

export const addLink = (url) => {
  return (dispatch) => {
    return dispatch({
      type: types.ADD_LINK,
      url: url
    })
  }
}

export const fetchPreview = (url) => {
    return async(dispatch) => {
      try {
        // let addNewUrl = await addLink(url)
        // let resData = await axios.get(`https://api.linkpreview.net/?key=${Configs.LinkPreview}&q=${url}`)
        return await axios.get(`https://api.linkpreview.net/?key=${Configs.LinkPreview}&q=${url}`)
          .then(async(res) => await res)
          .then(async(data) => {
            await addLink(url)
            // console.log(data.data.image)
            return data.data.image
          })

        // return resData.map(data => data)
        //   .then(data => {
        //     console.log(data)
        //     return dispatch({
        //       type: types.FETCH_IMAGE_PREVIEW,
        //       imagePreviewSrc: data
        //     })
        //   })
          .catch(e => {
            console.log(`ERROR: ${e}`)
            return new Error(e)
          })

      } catch (e) {
        console.log(`ERROR: ${e}`)
        return new Error(e)
      }
    }

}
