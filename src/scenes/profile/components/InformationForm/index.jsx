import React from 'react'
import { useTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core'

import { Field, Form } from 'react-final-form'

import validator, { mustBeAnEmail, required } from 'ROOT/services/validator'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import JTextField from 'ROOT/components/InputForm/TextField'

import styles from './styles'

const InformationForm = (props) => {

    const { classes, me} = props
    const {t} = useTranslation('profile')

    const submitForm = (values) => {

    }

    return (
        <Form
            onSubmit={(values) => submitForm(values)}
            validate={(values) => {
                const errors = {}
                errors.firstName = validator(values.firstName, required)
                errors.lastName = validator(values.lastName, required)
                errors.email = validator(values.email, required, mustBeAnEmail)
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
                    <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>{t('dialogTitle')}</DialogTitle>
                    <DialogContent>
                        <Grid container className={classes.detailMain} spacing={2}>
                            <Grid item xs={6}>
                                <Field
                                    name="lastName"
                                    label={t('field.lastName')}
                                    component={JTextField}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose} disabled={submitting} variant="contained">
                            {t('button.cancel')}
                        </Button>
                        <Button type="submit" color="primary" disabled={submitting || pristine}
                                variant="contained">
                            {t('button.update')}
                        </Button>
                    </DialogActions>
                </form>
            )} />
    )
}

export default withStyles(styles)(InformationForm)
