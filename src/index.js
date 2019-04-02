import React, { Component, createContext } from 'react'
import ReactDOM from 'react-dom'
import App, { store } from './App'
const Context = createContext()
export const { Provider, Consumer } = Context
class PPP extends Component {
  static contextType = Context
  render() {
    const { children } = this.props
    return <Provider value={store}>{children}</Provider>
  }
}

ReactDOM.render(
  <PPP>
    <App />
  </PPP>,
  document.getElementById('root')
)
