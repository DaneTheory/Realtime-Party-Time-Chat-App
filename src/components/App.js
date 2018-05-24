/* eslint-disable import/no-named-as-default */
import React from 'react'
import { Switch, NavLink, Route } from 'react-router-dom'

import HomePageContainer from '../containers/HomePageContainer'
import NotFoundPage from './NotFoundPage'


class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ HomePageContainer } />
        {/* <Route component={ NotFoundPage } /> */}
      </Switch>
    )
  }
}

export default App
