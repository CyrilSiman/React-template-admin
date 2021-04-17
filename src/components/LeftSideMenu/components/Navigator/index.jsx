import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Route } from 'react-router-dom'

import routes from 'ROOT/routes'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'

import useStyles from './styles'

const Navigator = (props) => {
    const { navigation,navigateToLink, ...other } = props

    const classes = useStyles()

    return (
        <Drawer {...other}>
            <List disablePadding>
                <ListItem className={classNames(classes.mainLogo, classes.item, classes.itemCategory)}>
                    <img src="/img/logoAppWhite.svg" alt="logo" height={44} />
                </ListItem>
                <Route path={routes.PRIVATE_DASHBOARD} >
                    {({ match }) => (
                        <ListItem
                            button
                            onClick={() => navigateToLink(routes.PRIVATE_DASHBOARD)}
                            className={classNames(classes.item, classes.topItemCategory, match && classes.itemActiveItem, 'joyride-step1')}>
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
                    )}
                </Route>
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
                        {children.map(({ id: childId, icon, path }) => (
                            <Route key={path} path={path} >
                                {({ match }) => (
                                    <ListItem
                                        onClick={() => navigateToLink(path)}
                                        key={path}
                                        button
                                        dense
                                        className={classNames(
                                            classes.item,
                                            match && classes.itemActiveItem,
                                            'joyride-step2'
                                        )}
                                    >
                                        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                        <ListItemText
                                            classes={{
                                                primary: classes.itemPrimary,
                                            }}
                                        >
                                            {childId}
                                        </ListItemText>
                                    </ListItem>
                                )}
                            </Route>
                        ))}
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    )
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
    navigation : PropTypes.array.isRequired,
    navigateToLink : PropTypes.func.isRequired,
}

export default Navigator