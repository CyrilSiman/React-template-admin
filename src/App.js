import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import routes from 'ROOT/routes'

import AuthenticatedRouter from 'ROOT/AuthenticatedRouter'

import AppInitScene from 'ROOT/scenes/AppInit'
import LoginScene from 'ROOT/scenes/Auth/scenes/Login'
import LostPasswordScene from 'ROOT/scenes/Auth/scenes/LostPassword'
import { useQuery } from '@apollo/react-hooks'
import { connected } from 'ROOT/services/graphql/localState.graphql'
import {appConfiguredQuery} from 'ROOT/services/graphql/appConfig.graphql'

function App () {

    const {data,loading} = useQuery(appConfiguredQuery)

    if(loading) {
        return <div>Loading</div>
    }

    console.log(data)

    if(!loading && data && !data.appConfigured) {
        return <Router><AppInitScene/></Router>
    }

    return (
        <Router>
            <Switch>
                <Route component={LoginScene} path={routes.LOGIN} />
                <Route component={LostPasswordScene} path={routes.LOST_PASSWORD} />
                <PrivateRoute component={AuthenticatedRouter} path={routes.PRIVATE_DEFAULT} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    )
}

function NoMatch ({ ...rest }) {

    const { data } = useQuery(connected)
    return (
        <Route
            {...rest}
            render={props => {
                return (data.isLoggedIn ? (
                    <Redirect to={{ pathname: routes.PRIVATE_DASHBOARD, state: { from: props.location } }} />
                ) : (
                    <Redirect to={{ pathname: routes.LOGIN, state: { from: props.location } }} />
                ))
            }
            }
        />
    )
}

function PrivateRoute ({ component: Component, ...rest }) {
    const { data } = useQuery(connected)
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: routes.LOGIN, state: { from: props.location } }} />
                )
            }
        />
    )
}

export default App
