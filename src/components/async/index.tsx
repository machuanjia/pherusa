/** @format */

import React, { Component } from 'react'

interface IAsyncComponentProps {}
interface IAsyncComponentState {
    component: any
}

export default function asyncComponent(importComponent: any) {
    class AsyncComponent extends Component<IAsyncComponentProps, IAsyncComponentState> {
        constructor(props: IAsyncComponentProps) {
            super(props)
            this.state = {
                component: null,
            }
        }
        async componentDidMount() {
            const { default: component } = await importComponent()
            this.setState({
                component: component,
            })
        }
        render() {
            const C = this.state.component
            return C ? <C {...this.props} /> : null
        }
    }

    return AsyncComponent
}
