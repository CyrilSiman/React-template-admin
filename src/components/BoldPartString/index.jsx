import React, {Fragment} from 'react'

const BoldStringPart = (props) => {

    const {src,find} = props

    let re = new RegExp(`(${find})`, 'gi')
    let value = src.split(re)

    return (
        <Fragment>
            {value.map((value,index) => {
                if(value) {
                    if(value.match(re)) {
                        return <span key={value + index}><b>{value}</b></span>
                    } else {
                        return <span key={value + index}>{value}</span>
                    }
                }

                return null
            })}
        </Fragment>
    )
}

export default BoldStringPart