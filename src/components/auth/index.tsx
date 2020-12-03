/** @format */

import React, { Component } from 'react'
import store from '@stores/store'

export const HighterComponet = ComposedComponent =>
  class extends Component {
    constructor(props) {
      super(props)
      this.state = store.getState()
      if (!this.state['app']['token']) {
        // 如果没有token
        this.props['history'].push('/login')
      }
    }
    componentDidMount() {}
    render() {
      return <ComposedComponent {...this.props} />
    }
  }
