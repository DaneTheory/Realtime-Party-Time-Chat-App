/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react'

import CreatePost from '../components/CreatePost/CreatePost'


class CreatePostContainer extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <CreatePost { ...this.props } />
    )
  }
}

export default CreatePostContainer
