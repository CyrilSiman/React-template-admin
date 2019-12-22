import React, { Fragment } from 'react'
import routes from 'ROOT/routes'
import { Redirect, Route, Switch } from 'react-router-dom'

import AppBar from 'ROOT/components/AppBar'
import LeftSideMenu from 'ROOT/components/LeftSideMenu'
import DashboardScene from 'ROOT/scenes/Dashboard'
import UsersScene from 'ROOT/scenes/Users'

import PeopleIcon from '@material-ui/icons/People'
import { AlertCircle, Email, AccountCardDetails } from 'mdi-material-ui'

const navigation = [
    {
        id: 'Main',
        children: [
            { id: 'Users', icon: <PeopleIcon />, active: false, path: routes.PRIVATE_MAIN_USERS },
            { id: 'PageTow', icon: <AccountCardDetails />, active: false, path: routes.PRIVATE_MAIN_PAGE_TWO },
        ],
    },
    {
        id: 'Configuration',
        children: [
            { id: 'Logs', icon: <AlertCircle />, active: false, path: routes.PRIVATE_CONFIG_PAGE_ONE },
            { id: 'Mails', icon: <Email />, active: false, path: routes.PRIVATE_CONFIG_PAGE_TWO },
        ]
    }
]

const AuthenticatedRouter = () => {

    return (
        <Fragment>
            <LeftSideMenu navigation={navigation}>
                <AppBar />
                    <Switch>
                        <Route component={DashboardScene} path={routes.PRIVATE_DASHBOARD} />
                        <Route component={UsersScene} path={routes.PRIVATE_MAIN_USERS} />
                        <Route component={defaultRedirect(routes.PRIVATE_DASHBOARD)} />
                    </Switch>
            </LeftSideMenu>
        </Fragment>
    )

}

const defaultRedirect = (path) => () => (
    <Redirect to={path} />
)

export default AuthenticatedRouter


