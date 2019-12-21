import React, {Component} from 'react'
import './App.css'
import routes from 'ROOT/routes'
import {Redirect, Route, Switch} from 'react-router-dom'

import DashboardScene from 'ROOT/scenes/Dashboard'
import ClientsScene from 'ROOT/scenes/Clients'
import LogsScene from 'ROOT/scenes/Logs'
import MailsScene from 'ROOT/scenes/Mails'
import ClientScene from 'ROOT/scenes/Client'
import ReportScene from 'ROOT/scenes/Report'
import LeftSideMenu from 'ROOT/components/LeftSideMenu'

import PeopleIcon from '@material-ui/icons/People'
import {AlertCircle, Email} from 'mdi-material-ui'


const navigation = [
    {
        id: 'B2B',
        children: [
            { id: 'Clients', icon: <PeopleIcon />, active: false, path : routes.PRIVATE_CLIENTS },
            {id: 'Rapport Clients', icon: <PeopleIcon/>, active: false, path: routes.PRIVATE_REPORT},
        ],
    },
    {
        id: 'Administration',
        children: [
            {id: 'Logs', icon: <AlertCircle/>, active: false, path: routes.PRIVATE_ADMIN_LOGS},
            {id: 'Mails', icon: <Email/>, active: false, path: routes.PRIVATE_ADMIN_MAILS},
        ]
    }
]

class AuthenticatedRouter extends Component {
    render() {
        return (
            <LeftSideMenu navigation={navigation}>
                <Switch>
                    <Route component={DashboardScene} path={routes.PRIVATE_DASHBOARD} />
                    <Route component={ClientsScene} path={routes.PRIVATE_CLIENTS} />
                    <Route component={ReportScene} path={routes.PRIVATE_REPORT}/>
                    <Route component={LogsScene} path={routes.PRIVATE_ADMIN_LOGS}/>
                    <Route component={MailsScene} path={routes.PRIVATE_ADMIN_MAILS}/>
                    <Route component={ClientScene} path={routes.PRIVATE_CLIENT} />
                    <Route component={defaultRedirect(routes.PRIVATE_DASHBOARD)} />
                </Switch>
            </LeftSideMenu>
        )
    }
}

const defaultRedirect = (path) => () => (
    <Redirect to={path}/>
)

export default AuthenticatedRouter


