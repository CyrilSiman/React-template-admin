import PropTypes from 'prop-types'
import React from 'react'
import { ImageBrokenVariant, TrendingDown, TrendingNeutral, TrendingUp } from 'mdi-material-ui'
import Tooltip from '@material-ui/core/Tooltip'
import useStyles from './styles'

const AgGridTrendCellRender = (props) => {

    const { value } = props
    const classes = useStyles()

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
            <IconValue className={classColor} />
        </Tooltip>
    )
}

export default AgGridTrendCellRender

AgGridTrendCellRender.propTypes = {
    value: PropTypes.any,
}