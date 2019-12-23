import React from 'react'
import { useTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core'

import { Field, Form } from 'react-final-form'

import validator, { mustBeAnEmail, required } from 'ROOT/services/validator'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import JTextField from 'ROOT/components/InputForm/TextField'

import styles from './styles'

const InformationForm = (props) => {

    const { classes, me} = props
    const {t} = useTranslation('profile')
    const {t:tError} = useTranslation('errors')

    const submitForm = (values) => {

    }

    return (
        <Form
            onSubmit={(values) => submitForm(values)}
            validate={(values) => {
                const errors = {}
                errors.firstName = tError(validator(values.firstName, required))
                errors.lastName = tError(validator(values.lastName, required))
                errors.email = tError(validator(values.email, required, mustBeAnEmail))
                return errors
            }
            }
            initialValues={{
                lastName: me.lastName,
                firstName: me.firstName,
                email: me.email,
            }}
            render={({ handleSubmit, form, pristine, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Grid container className={classes.detailMain} spacing={1}>
                            <Grid item xs={12}>
                                <Field
                                    name="lastName"
                                    label={t('field.lastName')}
                                    component={JTextField}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="firstName"
                                    label={t('field.firstName')}
                                    component={JTextField}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="email"
                                    label={t('field.email')}
                                    component={JTextField}
                                    fullWidth
                                    required
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

export default withStyles(styles)(InformationForm)
