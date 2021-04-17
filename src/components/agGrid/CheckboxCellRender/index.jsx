import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'
import { Checkbox } from '@material-ui/core'
import PropTypes from 'prop-types'

class CheckBoxCellRender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected:props.node.selected,
        }
        this.node = props.node
        this.toggleSelected = this.toggleSelected.bind(this)
    }

    toggleSelected() {
        const selected = !this.node.selected
        this.setState({ selected })
        this.node.setSelected(selected)
    }

    refresh(params) {
        if(params.node.selected !== this.state.selected) {
            this.setState({
                selected: params.node.selected,
            })
        }
        return true
    }

    render() {
        const { classes } = this.props
        const { selected } = this.state
        return (
            <Checkbox checked={selected} className={classes.checkbox} onChange={() => this.toggleSelected()} />
        )
    }
}

CheckBoxCellRender.propTypes = {
    classes:PropTypes.object.isRequired,
    node:PropTypes.object.isRequired,
}


export default withStyles(styles)(CheckBoxCellRender)
