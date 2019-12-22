import React, {Component} from 'react'
import {Typography} from '@material-ui/core'

export default class SliderFloatingFilter extends Component {
    constructor(props) {

        super(props)
        this.state = {
            currentValue: ''
        }
    }

    onParentModelChanged(parentModel) {
        // note that the filter could be anything here, but our purposes we're assuming a greater than filter only,
        // so just read off the value and use that
        this.setState({
            currentValue: !parentModel ? '' : parentModel.value
        })
    }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                <Typography variant={'caption'} style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    display: 'inline-block',
                    width: `${this.props.column.actualWidth - 20 - 21}px`
                }}>
                    {this.state.currentValue}
                </Typography>
            </div>
        )
    }
}