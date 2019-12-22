import React from 'react'
import { Link as MaterialLink } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

export default function (props) {
    const MiddlewareLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)
    return <MaterialLink component={MiddlewareLink} {...props} />
}