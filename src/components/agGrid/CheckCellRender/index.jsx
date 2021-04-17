import React, { Component } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'
import PropTypes from 'prop-types'

class CheckCellRender extends Component {
    constructor(props) {
        super(props)
        this.invokeParentMethod = this.invokeParentMethod.bind(this)
    }

    invokeParentMethod() {
        this.props.context.componentParent.addClientToFavorite(this.props.data)
    }

    render() {
        const { classes } = this.props

        const value = this.props.value ? <CheckIcon className={classes.smallIcon} fontSize="small" /> : ''
        return (
            <div>{value}</div>
        )
    }
}

CheckCellRender.propTypes = {
    value:PropTypes.any,
    classes:PropTypes.object.isRequired,
    context:PropTypes.object.isRequired,
    data:PropTypes.object.isRequired,
}


export default withStyles(styles)(CheckCellRender)
