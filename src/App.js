import React, { Component } from 'react'
import { Consumer } from '.'

//Action Constants
const actions = { DECREMENT: 'DECREMENT', INCREMENT: 'INCREMENT' }

// Action Creators
export const decrement = () => ({ type: actions.DECREMENT })
export const increment = () => ({ type: actions.INCREMENT })

// Reducer
const initialState = { count: 0 }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const newState = { ...state, count: state.count + 1 }
      console.log(newState)
      return newState
    }
    case actions.DECREMENT: {
      const newState = { ...state, count: state.count - 1 }
      console.log(newState)
      return newState
    }
    default:
      return state
  }
}

const createStore = reducer => {
  let currentState
  const listeners = []

  const getState = () => currentState

  const dispatch = action => {
    currentState = reducer(currentState, action)
    listeners.forEach(listener => listener())
    console.log('DISPATCH: ', JSON.stringify(action))
  }

  const subscribe = listener => {
    listeners.push(listener)
    return () => listeners.filter(x => x !== listener)
  }

  const store = { getState, dispatch, subscribe }
  dispatch({})
  return store
}

export const store = createStore(reducer)

class ActualConnect extends Component {
  componentDidMount = () => {
    const { store } = this.props
    store.subscribe(this.forceUpdate.bind(this))
  }
  render() {
    const { children } = this.props
    return <>{children}</>
  }
}

const connect = (mstp, mdtp) => WrappedComponent => {
  class Connect extends Component {
    render() {
      const { props } = this
      return (
        <Consumer>
          {store => (
            <ActualConnect store={store}>
              <WrappedComponent {...mstp(store.getState())} {...mdtp(store.dispatch)} {...props} />
            </ActualConnect>
          )}
        </Consumer>
      )
    }
  }
  return Connect
}

const App = ({ count, increment, decrement }) => (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>
)

const mstp = state => ({ count: state.count })
const mdtp = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: dispatch(decrement()),
})

export default connect(
  mstp,
  mdtp
)(App)
