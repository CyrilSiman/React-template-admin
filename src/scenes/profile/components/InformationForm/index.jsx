import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Field, Form } from 'react-final-form'

import validator, { mustBeAnEmail, required } from 'ROOT/services/validator'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import JTextField from 'ROOT/components/InputForm/TextField'

import useStyles from './styles'
import { useMutation } from '@apollo/client'
import { updateMyProfile } from 'ROOT/services/graphql/users.graphql'
import { useSnackbar } from 'notistack'

const InformationForm = (props) => {

    const { me } = props

    const classes = useStyles()

    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('profile')
    const { t:tError } = useTranslation('errors')

    const [updateMyProfileMutation] = useMutation(updateMyProfile,{
        onError:() => {
            enqueueSnackbar(tError('unknownError'),{ variant:'error' })
        },
    })

    const submitForm = (values) => {
        updateMyProfileMutation({ variables:{
            email:values.email,
            lastName:values.lastName,
            firstName:values.firstName,
        } })
    }

    return (
        <Form
            onSubmit={(values) => submitForm(values)}
            validate={(values) => {
                const errors = {}
                errors.firstName = validator(values.firstName,tError, required)
                errors.lastName = validator(values.lastName,tError, required)
                errors.email = validator(values.email,tError, required, mustBeAnEmail)
                return errors
            }
            }
            initialValues={{
                lastName: me.lastName,
                firstName: me.firstName,
                email: me.email,
            }}
            render={({ handleSubmit, form, pristine, submitting }) => (
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

export default InformationForm

InformationForm.propTypes = {
    me: PropTypes.object.isRequired,
}