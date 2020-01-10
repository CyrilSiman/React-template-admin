import React from 'react'
import { useTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'

import { Field, Form } from 'react-final-form'

import validator, { mustBeIdentical, required, passwordComplexity } from 'ROOT/services/validator'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import JTextField from 'ROOT/components/InputForm/TextField'

import { updateMyPassword } from 'ROOT/services/graphql/users.graphql'
import styles from './styles'

import { hasError } from 'ROOT/services/utils'
import constants from 'ROOT/services/constants'


const PasswordForm = (props) => {

    const { classes} = props
    const { enqueueSnackbar } = useSnackbar()
    const {t} = useTranslation('profile')
    const {t:tError} = useTranslation('errors')

    const [updateMyPasswordMutation] = useMutation(updateMyPassword)

    /*
    ,{
        onError:(error) => {
            if(hasError(error,constants.ERROR_CODE_PASSWORD_DONT_MATCH)) {
                enqueueSnackbar(tError('passwordDoesntMatch'),{variant:'error'})
            } else {
                enqueueSnackbar(tError('unknownError'),{variant:'error'})
            }
        }
    }
     */

    const submitForm = async (values,form) => {
        try {
            await updateMyPasswordMutation({variables:{
                    oldPassword:values.oldPassword,
                    newPassword:values.password,
                }})
            enqueueSnackbar(t('passwordChanged'),{variant:'success'})
            setTimeout(form.reset)
        } catch (error) {
            if(hasError(error,constants.ERROR_CODE_PASSWORD_DONT_MATCH)) {
                return { oldPassword: tError('passwordDoesntMatch') }
            } else {
                enqueueSnackbar(tError('unknownError'),{variant:'error'})
            }
        }
    }

    return (
        <Form
            onSubmit={(values,form) => submitForm(values,form)}
            validate={(values) => {
                const errors = {}
                errors.oldPassword = validator(values.oldPassword,tError, required)
                errors.password = validator(values.password,tError, required, passwordComplexity)
                errors.confirmPassword = validator(values.confirmPassword,tError, required, mustBeIdentical(values.password))
                return errors
            }
            }
            initialValues={{
                oldPassword: '',
                password: '',
                confirmPassword: '',
            }}
            render={({ handleSubmit, form, pristine, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Grid container className={classes.detailMain} spacing={1}>
                            <Grid item xs={12}>
                                <Field
                                    name="oldPassword"
                                    label={t('field.oldPassword')}
                                    component={JTextField}
                                    fullWidth
                                    type='password'
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="password"
                                    label={t('field.password')}
                                    component={JTextField}
                                    fullWidth
                                    required
                                    type='password'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="confirmPassword"
                                    label={t('field.confirmPassword')}
                                    component={JTextField}
                                    fullWidth
                                    required
                                    type='password'
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.divButton}>
                        <Button onClick={() => form.reset()} disabled={submitting} variant="contained">
                            {t('button.reset')}
                        </Button>
                        <Button type="submit" color="primary" disabled={submitting || pristine}
                                variant="contained">
                            {t('button.update')}
                        </Button>
                    </div>
                </form>
            )} />
    )
}

export default withStyles(styles)(PasswordForm)
