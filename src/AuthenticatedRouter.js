import React, { Fragment } from 'react'
import routes from 'ROOT/routes'
import { Redirect, Route, Switch } from 'react-router-dom'

import AppBar from 'ROOT/components/AppBar'
import LeftSideMenu from 'ROOT/components/LeftSideMenu'
import DashboardScene from 'ROOT/scenes/Dashboard'
import UsersScene from 'ROOT/scenes/users/listing'
import TeamsScene from 'ROOT/scenes/teams/listing'
import EmailsScene from 'ROOT/scenes/emails/listing'
import TokensScene from 'ROOT/scenes/tokens/listing'


import PeopleIcon from '@material-ui/icons/People'
import AlertCircle from 'mdi-material-ui/AlertCircle'
import AccountCardDetails from 'mdi-material-ui/AccountDetails'
import FolderKeyNetwork from 'mdi-material-ui/FolderKeyNetwork'
import Emails from 'mdi-material-ui/Email'

const navigation = [
    {
        id: 'Main',
        children: [
            { id: 'Teams', icon: <AccountCardDetails />, active: false, path: routes.PRIVATE_TEAMS },
            { id: 'Users', icon: <PeopleIcon />, active: false, path: routes.PRIVATE_USERS },
        ],
    },
    {
        id: 'Configuration',
        children: [
            { id: 'Role', icon: <AlertCircle />, active: false, path: routes.PRIVATE_CONFIG_PAGE_ONE },
        ],
    },
    {
        id: 'System',
        children: [
            { id: 'Emails', icon: <Emails />, active: false, path: routes.PRIVATE_EMAILS },
            { id: 'Tokens', icon: <FolderKeyNetwork />, active: false, path: routes.PRIVATE_TOKENS },
        ],
    },
]
const defaultRedirect = (path) => () => (
    <Redirect to={path} />
)

const AuthenticatedRouter = () => {

    return (
        <Fragment>
            <LeftSideMenu navigation={navigation}>
                <AppBar />
                <Switch>
                    <Route component={DashboardScene} path={routes.PRIVATE_DASHBOARD} />
                    <Route component={TeamsScene} path={routes.PRIVATE_TEAMS} />
                    <Route component={UsersScene} path={routes.PRIVATE_USERS} />
                    <Route component={EmailsScene} path={routes.PRIVATE_EMAILS} />
                    <Route component={TokensScene} path={routes.PRIVATE_TOKENS} />
                    <Route component={defaultRedirect(routes.PRIVATE_DASHBOARD)} />
                </Switch>
            </LeftSideMenu>
        </Fragment>
    )

}


export default AuthenticatedRouter


