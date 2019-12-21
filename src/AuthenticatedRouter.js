import React, { Component, Fragment } from 'react'
import routes from 'ROOT/routes'
import { Redirect, Route, Switch } from 'react-router-dom'

import AppBar from 'ROOT/components/AppBar'
import LeftSideMenu from 'ROOT/components/LeftSideMenu'
import DashboardScene from 'ROOT/scenes/Dashboard'
import MainPageOneScene from 'ROOT/scenes/Main'

import PeopleIcon from '@material-ui/icons/People'
import { AlertCircle, Email, AccountCardDetails } from 'mdi-material-ui'
import { withStyles } from '@material-ui/core'

import styles from './style'

const navigation = [
    {
        id: 'Main',
        children: [
            { id: 'PageOne', icon: <PeopleIcon />, active: false, path: routes.PRIVATE_MAIN_PAGE_ONE },
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

const AuthenticatedRouter = (props) => {

    const { classes } = props

    return (
        <Fragment>
            <LeftSideMenu navigation={navigation}>
                <AppBar />
                <div className={classes.appContent}>
                    <Switch>
                        <Route component={DashboardScene} path={routes.PRIVATE_DASHBOARD} />
                        <Route component={MainPageOneScene} path={routes.PRIVATE_MAIN_PAGE_ONE} />
                        <Route component={defaultRedirect(routes.PRIVATE_DASHBOARD)} />
                    </Switch>
                </div>
            </LeftSideMenu>
        </Fragment>
    )

}

const defaultRedirect = (path) => () => (
    <Redirect to={path} />
)

export default withStyles(styles)(AuthenticatedRouter)


