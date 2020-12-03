/** @format */

import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import store from '@stores/store'
import { getToken } from '@utils/catch'

import Error404 from '@views/no-fond'
import LoginView from '@views/login'
import AboutView from '@views/about'

const settings = {
    unAuthPath: '/login',
    authPath: '/',
    whiteList: ['/login', '/about', '/404'],
}
/**
 *
 * @param routers 传入的渲染路由，如果不传则为跟路由
 * @param extraProps
 * @param switchProps
 *
 */
export const generateRoutes = (routes, extraProps = {}, switchProps = {}) => {
    return routes ? (
        <Switch {...switchProps}>
            {/* <Route exact strict path="/login" render={() => <LoginView />} />
            <Route exact strict path="/about" render={() => <AboutView />} /> */}

            {routes.map((route: any, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={props => {
                        return <route.component {...props} {...extraProps} route={route} />
                        // 路由更新都会调用此函数
                        // const token = getToken()
                        // if (token) {
                        //     if (settings.whiteList.indexOf(route.path) !== -1) {
                        //         return (
                        //             <Redirect to={{ pathname: settings.authPath, state: { from: props.location } }} />
                        //         )
                        //     }
                        //     return <route.component {...props} {...extraProps} route={route} />
                        // } else {
                        //     if (settings.whiteList.indexOf(route.path) !== -1) {
                        //         return <route.component {...props} {...extraProps} route={route} />
                        //     }
                        //     return <Redirect to={{ pathname: settings.unAuthPath, state: { from: props.location } }} />
                        // }
                    }}
                />
            ))}
            <Route component={Error404} />
        </Switch>
    ) : null
}
