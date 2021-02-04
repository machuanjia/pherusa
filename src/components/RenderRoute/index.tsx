/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-02-04 15:35:12
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/components/RenderRoute/index.tsx
 * @Description: 
 */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Error404 from '@views/no-fond/index'

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
      {routes.map((route: any, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            return <route.component {...props} {...extraProps} route={route} />
          }}
        />
      ))}
      <Route component={Error404} />
    </Switch>
  ) : null
}
