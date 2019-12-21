import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link, Route} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import routes from 'ROOT/routes'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'

import styles from './styles'

function Navigator(props) {
    const { classes,navigation, ...other } = props

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={classNames(classes.mainTitle, classes.item, classes.itemCategory)}>
                    <img src='/img/jobmaker-logo-white.svg' alt='Jobmaker logo' width={150}/>
                </ListItem>
                <Route path={routes.PRIVATE_DASHBOARD} children={({ match }) => (
                        <ListItem
                            button
                            to={routes.PRIVATE_DASHBOARD}
                            component={Link}
                            className={classNames(classes.item, classes.itemCategory, match && classes.itemActiveItem)}>
                            <ListItemIcon className={classes.itemIcon}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary: classes.itemPrimary,
                                }}
                            >
                                Dashboard
                            </ListItemText>
                        </ListItem>
                    )} />
                {navigation.map(({ id, children }) => (
                    <React.Fragment key={id}>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {id}
                            </ListItemText>
                        </ListItem>

                        {children.map(({ id: childId, icon, active, path }) => (
                            <Route key={path} path={path} children={({ match }) => (
                                <ListItem
                                    key={path}
                                    button
                                    to={path}
                                    component={Link}
                                    dense
                                    className={classNames(
                                        classes.item,
                                        classes.itemActionable,
                                        match && classes.itemActiveItem,
                                    )}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                        }}
                                    >
                                        {childId}
                                    </ListItemText>
                                </ListItem>
                            )}/>
                        ))}
                        <Divider className={classes.divider} />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    )
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
    navigation : PropTypes.array.isRequired
}

export default withStyles(styles)(Navigator)