/** @format */
import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // this.setState({ hasError: true })
    // console.log(error)
  }

  render() {
    return this.props.children
  }
}
