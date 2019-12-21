import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter, useHistory } from 'react-router-dom'
import { useApolloClient, useQuery } from 'react-apollo'
import {default as MUIAppBar} from '@material-ui/core/AppBar'

import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/core/Menu/Menu'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import PermIdentity from '@material-ui/icons/PermIdentity'
import HelpIcon from '@material-ui/icons/Help'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { logoutQuery, meQuery } from 'ROOT/services/graphql/auth.graphql'
import { useMutation } from '@apollo/react-hooks'

const AppBar = (props) => {

    const { classes } = props
    const { t } = useTranslation('appBar')
    const history = useHistory()
    const client = useApolloClient()

    const [logoutMutation] = useMutation(logoutQuery, {
        onCompleted: async (data) => {
            await client.resetStore()
            //client.writeData({ data: { isLoggedIn: false } })
            //history.push('/')
        },
        onError: async (error) => {
            await client.resetStore()
            //client.writeData({ data: { isLoggedIn: false } })
            //history.push('/')
        }
    })

    const { loading : loadingMe, data : dataMe } = useQuery(meQuery,{
        onError : () => {
            logoutMutation()
        }
    })

    const [menuOpen, setMenuOpen] = useState(false)
    const anchorEl = useRef(null)

    const toggleLeftMenu = () => {
        client.writeData({ data: { showLeftMenu : true }})
    }

    const twoLetterFromName = (lastName,firstName) => {
        let initial = ''
        if(lastName) {
            initial += lastName[0]
        }
        if(firstName) {
            initial += firstName[0]
        }
        return initial
    }

    return (
        <MUIAppBar color="primary" position="sticky"  elevation={4} className={classes.header}>
            <Toolbar >
                <Grid container spacing={1} alignItems="center">
                    <Hidden lgUp>
                        <Grid item xs>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={toggleLeftMenu}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Hidden>
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                        <Tooltip title={t('alerts')}>
                            <IconButton color="inherit">
                                <NotificationsIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title={t('help')}>
                            <IconButton color="inherit">
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <IconButton ref={anchorEl} color="inherit" className={classes.iconButtonAvatar} onClick={() => setMenuOpen(true)}>
                            <Avatar className={classes.avatar} >
                                {!loadingMe && dataMe && twoLetterFromName(dataMe.me.firstName,dataMe.me.lastName,)}
                            </Avatar>
                        </IconButton>
                    </Grid>
                </Grid>
                <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl.current}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                >
                    <MenuItem onClick={() => setMenuOpen(false)}>
                        <ListItemIcon className={classes.icon}>
                            <PermIdentity/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.primary}} inset primary={t('profile')}/>
                    </MenuItem>
                    <MenuItem onClick={logoutMutation}>
                        <ListItemIcon className={classes.icon}>
                            <PowerSettingsNew />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary={t('logout')} />
                    </MenuItem>
                </Menu>
            </Toolbar>
        </MUIAppBar>
    )
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(AppBar))
