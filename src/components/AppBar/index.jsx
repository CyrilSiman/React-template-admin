import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useHistory, withRouter } from 'react-router-dom'
import { ApolloConsumer, Query } from 'react-apollo'
import { Account } from 'mdi-material-ui'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/core/Menu/Menu'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { useTranslation } from 'react-i18next'
//import {meQuery} from 'ROOT/services/graphql/operator.graphql'

const Header = (props) => {

    const anchorEl = useRef()
    let history = useHistory()
    const { t } = useTranslation('global')
    const { classes, onDrawerToggle } = props

    const _logout = (client) => {
        localStorage.clear()
        client.writeData({ data: { isLoggedIn: false } })
        client.clearStore()
        history.push('/')
    }

    const handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget })
    }
    const handleClose = () => {
        this.setState({ anchorEl: null })
    }

    const twoLetterFromName = (name) => {
        const tab = name.split(' ')
        if (tab.length === 2) {
            return tab[0].charAt(0) + tab[1].charAt(0)
        } else if (tab.length === 1 && tab[0].length > 2) {
            return tab[0].charAt(0) + tab[0].charAt(1)
        } else {

        }
    }

    const open = Boolean(anchorEl)

    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={1} className={classes.header}>
                <Toolbar>
                    <Grid container spacing={8} alignItems="center">
                        <Hidden lgUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item xs>
                            <img src='/img/logoApp.svg' alt={t('appName')} width={150} />
                        </Grid>
                        {/*
                        <Grid item>
                            <Tooltip title="Alerts • No alters">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Help">
                                <IconButton color="inherit">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>*/}
                        <Grid item>
                            <IconButton color="inherit" className={classes.iconButtonAvatar} onClick={this.handleMenu}>
                                {/*
                                <Query query={meQuery}>
                                    {({loading, data, error}) => {
                                            return <Avatar className={classes.avatar} >
                                                <Account/>
                                                </Avatar>
                                        }
                                    }
                                </Query>*/}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ApolloConsumer>
                        {client => (
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                {/*
                                <MenuItem onClick={this.handleClose}>
                                    <ListItemIcon className={classes.icon}>
                                        <PermIdentity/>
                                    </ListItemIcon>
                                    <ListItemText classes={{primary: classes.primary}} inset primary="Profile"/>
                                </MenuItem>
                                */}
                                <MenuItem onClick={() => {
                                    _logout(client)
                                }}>
                                    <ListItemIcon className={classes.icon}>
                                        <PowerSettingsNew />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                                </MenuItem>
                            </Menu>
                        )}
                    </ApolloConsumer>

                </Toolbar>
            </AppBar>
            <div className={classes.appContent}>
                {this.props.children}
            </div>
        </React.Fragment>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(Header))
