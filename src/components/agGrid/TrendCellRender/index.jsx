import React, {Component} from 'react'
import {ImageBrokenVariant, TrendingDown, TrendingNeutral, TrendingUp} from 'mdi-material-ui'
import {Tooltip, withStyles} from '@material-ui/core'
import styles from './styles'

class agGridTrendCellRender extends Component {

    refresh() {
        return false
    }

    render() {
        const {classes, value} = this.props

        let IconValue = ImageBrokenVariant
        let classColor = classes.iconNone
        let text = 'n/a'
        switch (value) {
            case 'up' :
                classColor = classes.iconUp
                IconValue = TrendingUp
                text = 'A la hausse'
                break
            case 'down' :
                classColor = classes.iconDown
                IconValue = TrendingDown
                text = 'A la baisse'
                break
            case 'neutral' :
                classColor = classes.iconNeutral
                IconValue = TrendingNeutral
                text = 'Stable'
                break
            default:
                break
        }

        return (
            <Tooltip title={text} aria-label={text}>
                <IconValue className={classColor}/>
            </Tooltip>
        )
    }
}

export default withStyles(styles)(agGridTrendCellRender)