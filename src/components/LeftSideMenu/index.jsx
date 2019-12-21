import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Header from './components/Header'
import Navigator from './components/Navigator'
import styles, {drawerWidth} from './styles'

class LeftSideMenu extends React.Component {

    state = {
        mobileOpen: false
    }

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}))
    }

    render() {
        const {classes,navigation} = this.props

        return (
            <div className={classes.root}>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="js">
                        <Navigator
                            navigation={navigation}
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                        />
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Navigator PaperProps={{ style: { width: drawerWidth } }} navigation={navigation} />
                    </Hidden>
                </nav>
                <div className={classes.appContent}>
                    <Header onDrawerToggle={this.handleDrawerToggle} className={classes.header}/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

LeftSideMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    navigation : PropTypes.array.isRequired
}

export default withStyles(styles, {withTheme: true})(LeftSideMenu)
