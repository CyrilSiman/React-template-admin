import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import routes from 'ROOT/routes'

import AuthenticatedRouter from 'ROOT/AuthenticatedRouter'

import AppInitScene from 'ROOT/scenes/AppInit'
import LoginScene from 'ROOT/scenes/Auth/scenes/Login'
import LostPasswordScene from 'ROOT/scenes/Auth/scenes/LostPassword'
import ResetPasswordScene from 'ROOT/scenes/Auth/scenes/ResetPassword'
import { useQuery } from '@apollo/client'
import { appConfiguredQuery } from 'ROOT/services/graphql/appConfig.graphql'

import constants from 'ROOT/services/constants'
import PropTypes from 'prop-types'

function NoMatch ({ ...rest }) {
    return (
        <Route
            {...rest}
            render={params =>
                localStorage.getItem(constants.IS_AUTHENTICATED) ? (
                    <Redirect to={{ pathname: routes.PRIVATE_DASHBOARD, state: { from: params.location } }} />
                ) : (
                    <Redirect to={{ pathname: routes.LOGIN, state: { from: params.location } }} />
                )
            }
        />
    )
}


function App () {

    const { data,loading } = useQuery(appConfiguredQuery)

    if(loading) {
        return <div>&nbsp;</div>
    }

    if(!loading && data && !data.appConfigured) {
        return <Router><AppInitScene /></Router>
    }

    return (
        <Router>
            <Switch>
                <Route component={LoginScene} path={routes.LOGIN} />
                <Route component={LostPasswordScene} path={routes.LOST_PASSWORD} />
                <Route component={ResetPasswordScene} path={routes.RESET_PASSWORD} />
                <PrivateRoute component={AuthenticatedRouter} path={routes.PRIVATE_DEFAULT} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    )
}


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={params =>
                localStorage.getItem(constants.IS_AUTHENTICATED) ? (
                    <Component {...params} />
                ) : (
                    <Redirect to={{ pathname: routes.LOGIN, state: { from: params.location } }} />
                )
            }
        />
    )
}

PrivateRoute.propTypes = {
    component:PropTypes.any.isRequired,
}

export default App
