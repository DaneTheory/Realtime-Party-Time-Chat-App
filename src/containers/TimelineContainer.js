/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react'

import TimelineList from '../components/TimelineList/TimelineList'


class TimelineContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { Users, Posts,FetchPreview } = this.props
    return (
      <div className="timeline__items">
        <TimelineList  Users={ Users } Posts={ Posts } FetchPreview={ FetchPreview }/>
      </div>
    )
  }
}

export default TimelineContainer
