/** @format */

import React, { Component } from 'react'
import Routers from '@routes/index'
import { BrowserRouter } from 'react-router-dom'
import MainLayout from '@layouts/main.layout'
import NavComponent from '@layouts/nav/nav.component'

interface IAppComponentProps {}
interface IAppComponentState {
    isAuthenticated: Boolean
}

class App extends Component<IAppComponentProps, IAppComponentState> {
    constructor(props: IAppComponentProps) {
        super(props)
        this.state = {
            isAuthenticated: true,
        }
    }
    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
        }
        return (
            <MainLayout>
                <NavComponent key="left"></NavComponent>
                <BrowserRouter key="center">
                    <Routers childProps={childProps} />
                </BrowserRouter>
            </MainLayout>
        )
    }
}

export default App
