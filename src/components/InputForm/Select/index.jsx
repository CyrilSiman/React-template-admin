import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'

const SelectField = ({ readOnly,label,required,fullWidth, input: { name, onChange, value, ...restInput }, meta, items }) => {

    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched

    const classes = useStyles()

    return (
        <FormControl className={classes.formControlMargin} fullWidth={fullWidth} disabled={readOnly} error={showError} >
            <InputLabel htmlFor={`${name}-input`} shrink={true} required={required}>
                {label}
            </InputLabel>
            <Select
                value={value}
                classes={{ disabled:classes.disabled,root:classes.input, select:classes.select }}
                onChange={onChange}
                {...restInput}
                inputProps={{
                    name: name,
                    id: `${name}-input`,
                }}
            >
                {
                    items.map(value => <MenuItem key={value[0]} value={value[0]}>{value[1]}</MenuItem>)
                }
            </Select>
            {showError &&
                <FormHelperText error classes={{ root:classes.formHelper,disabled:classes.formHelperDisabled }}>{meta.error || meta.submitError}</FormHelperText>
            }
        </FormControl>
    )
}

export default SelectField

SelectField.propTypes = {
    classes: PropTypes.any,
    fullWidth: PropTypes.bool,
    items: PropTypes.array.isRequired,
    label: PropTypes.any,
    meta: PropTypes.object.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    input:PropTypes.object.isRequired,
}

SelectField.defaultProps = {
    fullWidth: false,
    readOnly: false,
    required: false,
}