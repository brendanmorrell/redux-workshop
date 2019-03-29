import React, { Component } from 'react'

// const store = {
//   state: {}, // state is an object
//   listeners: [], // listeners are an array of functions
//   dispatch: () => {}, // dispatch is a function
//   subscribe: () => {}, // subscribe is a function
//   getState: () => {}, // getState is a function
// }

const createStore = reducer => {
  let currentState = {}
  const listeners = []

  const getState = () => currentState

  const dispatch = action => {
    currentState = reducer(currentState, action)
    listeners.forEach(listener => listener())
    // console.log('DISPATCH: ', JSON.stringify(action))
  }

  const subscribe = listener => {
    listeners.push(listener)
    return () => listeners.filter(x => x !== listener)
  }

  const store = { getState, dispatch, subscribe }

  return store
}

const actions = { DECREMENT: 'DECREMENT' }
const decrement = () => ({ type: actions.DECREMENT })

const initialState = { count: 0 }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const newState = { ...state, count: state.count + 1 }
      console.log('NEW STATE: ', JSON.stringify(newState))
      return newState
    }
    case actions.DECREMENT: {
      const newState = { ...state, count: state.count - 1 }
      console.log('NEW STATE: ', JSON.stringify(newState))
      return newState
    }
    default:
      return state
  }
}
const store = createStore(initialState, reducer)

const { dispatch, getState, subscribe } = store

class App extends Component {
  render() {
    const state = getState()
    console.log('Current State: ', JSON.stringify(state))
    return (
      <div>
        {state.count}
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => dispatch(decrement())}>+</button>
      </div>
    )
  }
}

export default App
