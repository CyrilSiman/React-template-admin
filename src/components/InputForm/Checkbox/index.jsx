import PropTypes from 'prop-types'
import React from 'react'
import useStyles from './styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const TextField = ({ readOnly, label, labelPlacement = 'start', input: { name, checked, onChange, ...restInput }, meta }) => {

    const classes = useStyles()

    return (
        <FormControlLabel
            className={classes.checkboxControlLabel}
            labelPlacement={labelPlacement}
            control={
                <Checkbox
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    color="primary"
                    disabled={readOnly}
                    {...restInput}
                />
            }
            label={label}
        />
    )
}

export default TextField

TextField.propTypes = {
    label: PropTypes.any,
    labelPlacement: PropTypes.string,
    meta: PropTypes.object,
    readOnly: PropTypes.bool,
    input : PropTypes.object.isRequired,
}

TextField.defaultProps = {
    labelPlacement: 'start',
    readOnly: false,
}