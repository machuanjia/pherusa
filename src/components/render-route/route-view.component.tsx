/** @format */

import React, { Component, Fragment } from 'react'
import { generateRoutes } from './index'
import { getConstantRoutes, getAuthRoutes } from '../../permission'
import store from '@stores/store'
import { checkAuth } from './../../permission'
import { withRouter } from 'react-router-dom'
import { AUTH_ROUTE } from '@constants/index'

interface IRouteViewProps {
    route?: []
    type?: string
}
interface IRouteViewState {
    type?: string
}

class RouteViewComponent extends Component<IRouteViewProps, IRouteViewState> {
    private subRoles

    constructor(props) {
        super(props)
        this.state = {
            type: AUTH_ROUTE.constant.key,
        }
        this.subRoles = store.subscribe(() => {
            const roles = store.getState().app.roles || []
            if (roles.length > 0) {
                this.setState({
                    type: AUTH_ROUTE.async.key,
                })
            } else {
                this.props['history'].push('/login')
            }
        })
    }

    componentDidMount() {
        if (store.getState().app.roles.length === 0) {
            checkAuth()
        }
    }

    componentWillMount() {}

    componentWillUnmount() {
        this.subRoles && this.subRoles()
    }

    getRoutes() {
        const route = this.props['route']
        let routes = null
        if (route) {
            routes = route['children']
        } else if (this.state.type === AUTH_ROUTE.constant.key) {
            routes = getConstantRoutes()
        } else if (this.state.type === AUTH_ROUTE.async.key) {
            routes = getAuthRoutes()
        }
        return routes
    }

    render() {
        const routes = this.getRoutes()
        return <Fragment>{generateRoutes(routes)}</Fragment>
    }
}
export default withRouter(RouteViewComponent)
