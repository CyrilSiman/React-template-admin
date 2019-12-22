import React, {Component} from 'react'
import {IconButton, Tooltip, withStyles} from '@material-ui/core'
import {Pin} from 'mdi-material-ui'
import styles from './styles'

class agGridFavoritCellRender extends Component {
    constructor(props) {
        super(props)
        this.invokeParentMethod = this.invokeParentMethod.bind(this)
    }

    invokeParentMethod(value, node) {
        if (value) {
            this.props.context.componentParent.addClientToFavorite(this.props.data, node)
        } else {
            this.props.context.componentParent.removeClientFromFavorite(this.props.data, node)
        }

    }

    refresh() {
        return false
    }

    render() {
        const { classes, value } = this.props

        return (
            <Tooltip title={value ? 'Supprimer des favoris' : 'Ajouter aux favoris'}
                     aria-label={value ? 'Supprimer des favoris' : 'Ajouter aux favoris'}>
                <IconButton className={classes.smallIcon} aria-label="Favorite"
                            onClick={() => this.invokeParentMethod(!value, this.props.node)}>
                    <Pin fontSize="small" classes={{colorPrimary: value ? classes.iconEnable : classes.iconDisable}}
                         color='primary'/>
                </IconButton>
            </Tooltip>
        )
    }
}

export default withStyles(styles)(agGridFavoritCellRender)