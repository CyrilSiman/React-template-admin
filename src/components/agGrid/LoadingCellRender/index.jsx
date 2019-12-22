import React from 'react'
import {CircularProgress} from '@material-ui/core/'

const agGridLoadingCellRender = (props) => {
    return (
        props.value ? <div style={{textAlign:'center'}}><CircularProgress size={16} /></div> : <div> </div>
    )
}

export default agGridLoadingCellRender