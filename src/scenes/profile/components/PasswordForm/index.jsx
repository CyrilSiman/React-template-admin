import React from 'react'
import { useTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core'

import { Field, Form } from 'react-final-form'

import validator, { mustBeIdentical, required, passwordComplexity } from 'ROOT/services/validator'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import JTextField from 'ROOT/components/InputForm/TextField'

import styles from './styles'

const PasswordForm = (props) => {

    const { classes} = props
    const {t} = useTranslation('profile')
    const {t:tError} = useTranslation('errors')

    const submitForm = (values) => {
        console.log(values)
    }

    return (
        <Form
            onSubmit={(values) => submitForm(values)}
            validate={(values) => {
                const errors = {}
                errors.oldPassword = tError(validator(values.oldPassword, required))
                errors.password = tError(validator(values.password, required, passwordComplexity))
                errors.confirmPassword = tError(validator(values.confirmPassword, required, mustBeIdentical(values.password)))
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
