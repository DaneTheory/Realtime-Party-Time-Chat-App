import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import handleTransitions from 'redux-history-transitions'
import { createLogger } from 'redux-logger'
import reduxUnhandledAction from 'redux-unhandled-action'

import rootReducer from '../reducers'


export const history = createHistory()

const reactRouterMiddleware = routerMiddleware(handleTransitions(history))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const nextReducer = require('../reducers').default
const uselessActionReporter = action => console.error(`${action} DID NOT ALTER NEW STATE FROM PREVIOUS STATE`)
const reduxDevLogger = createLogger({
  collapsed: false,
  duration: true,
  timestamp: true,
  level: 'info',
  logErrors: true,
  diff: true
})

const Middleware = {
  dev: [
    reduxImmutableStateInvariant(),
    thunk,
    promiseMiddleware,
    reactRouterMiddleware,
    reduxUnhandledAction(uselessActionReporter),
    reduxDevLogger
  ],
  prod: [
    thunk,
    promiseMiddleware,
    reactRouterMiddleware
  ]
}

const configureStoreDev = (initialState) => {
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...Middleware.dev)))
  if (module.hot) module.hot.accept('../reducers', () => store.replaceReducer(nextReducer))
  return store
}
const configureStoreProd = (initialState) => createStore(rootReducer, initialState, compose(applyMiddleware(...Middleware.prod)))
const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
