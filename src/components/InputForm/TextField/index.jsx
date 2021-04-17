import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import useStyles from './styles'
import PropTypes from 'prop-types'

const TextField = ({ readOnly, rows, label, required, fullWidth, multiline, autoFocus, input: { name, onChange, value, type, ...restInput }, meta }) => {

    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched

    const classes = useStyles()

    return (
        <FormControl className={classes.formControlMargin} fullWidth={fullWidth} disabled={readOnly} error={!!showError} >
            <InputLabel htmlFor={`${name}-input`} shrink={true} required={required}>
                {label}
            </InputLabel>
            <Input
                classes={{ disabled:classes.disabled,root:classes.input }}
                id={`${name}-input`}
                autoFocus={autoFocus}
                autoComplete="off"
                value={value}
                {...restInput}
                onChange={onChange}
                multiline={multiline}
                rows={rows}
                type={type ? type : 'text'}
            />
            <FormHelperText error classes={{ root:classes.formHelper,disabled:classes.formHelperDisabled }}>{showError && (meta.error || meta.submitError)}</FormHelperText>
        </FormControl>
    )
}

TextField.defaultProps = {
    fullWidth: false,
    meta: false,
    multiline: false,
    readOnly: false,
    required: false,
}

TextField.propTypes = {
    autoFocus: PropTypes.bool,
    fullWidth: PropTypes.bool,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object.isRequired,
    multiline: PropTypes.bool,
    readOnly: PropTypes.bool.isRequired,
    required: PropTypes.bool,
    rows: PropTypes.number,
}

export default TextField

