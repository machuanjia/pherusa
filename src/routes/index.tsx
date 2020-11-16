/** @format */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AsyncComponent, AppliedRoute, AuthenticatedRoute, UnauthenticatedRoute } from '@components/index'
const AsyncDashboard = AsyncComponent(() => import('../views/dashboard'))
const AsyncAbout = AsyncComponent(() => import('../views/about'))
const AsyncNotFound = AsyncComponent(() => import('../views/no-fond'))
const AsyncLogin = AsyncComponent(() => import('../views/login'))

export default ({ childProps }: any) => (
    <Switch>
        <AppliedRoute path="/" exact component={AsyncDashboard} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={AsyncLogin} props={childProps} />
        <AuthenticatedRoute path="/about" exact component={AsyncAbout} props={childProps} />
        <Route component={AsyncNotFound} />
    </Switch>
)
