import React, {Component} from 'react'
import './style.css'

export default class HeaderGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className="ag-header-group-cell-label">
                <div className="customHeaderLabel" style={{flexGrow: 2}}>{this.props.displayName}</div>
            </div>
        )
    }
}