import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { useMutation, useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import Alert from '@material-ui/lab/Alert'
import TextField from 'ROOT/components/InputForm/TextField'
import Button from '@material-ui/core/Button/Button'
import WindowForm from 'ROOT/components/Window'
import { Link, useParams } from 'react-router-dom'

import validator, { mustBeIdentical, passwordComplexity, required } from 'ROOT/services/validator'

import constants from 'ROOT/services/constants'

import ArrowBack from 'mdi-material-ui/ArrowLeft'
import { resetPasswordMutation, resetPasswordTokenStillValid } from 'ROOT/services/graphql/auth.graphql'

import useStyles from './styles'
import { hasError } from 'ROOT/services/utils'
import { useSnackbar } from 'notistack'

const LostPasswordScene = () => {

    const classes = useStyles()
    const [message,setMessage] = useState(null)
    const [error,setError] = useState(null)
    const { t } = useTranslation('auth')
    const { t:tError } = useTranslation('errors')
    const { enqueueSnackbar } = useSnackbar()
    const { token } = useParams()

    const { data:tokenStillValid,loading } = useQuery(resetPasswordTokenStillValid,{ variables:{ token } })
    const [resetPassword] = useMutation(resetPasswordMutation)

    const submit = async (values,form) => {
        try {
            await resetPassword({ variables: { newPassword: values.password, token:token } })
            setMessage(t('congratsPasswordReset'))
            setError(null)
            setTimeout(form.reset)
        } catch (error) {
            if(hasError(error,constants.ERROR_CODE_TOKEN_EXPIRED)) {
                setMessage(null)
                setError(tError('tokenExpired'))
                //console.log(constants.ERROR_CODE_TOKEN_EXPIRED)
            } else if(hasError(error,constants.ERROR_CODE_TOKEN_NOT_RECOGNIZED)) {
                setMessage(null)
                setError(tError('tokenNotRecognized'))
                //console.log(constants.ERROR_CODE_TOKEN_NOT_RECOGNIZED)
            } else {
                enqueueSnackbar(tError('unknownError'),{ variant:'error' })
            }
        }
    }

    if(loading) {
        return null
    }

    if((!loading && tokenStillValid && !tokenStillValid.resetPasswordTokenStillValid) || error) {
        return <WindowForm >
            <Alert severity="error" className={classes.alert}>{tError('tokenExpired')}</Alert>
            <Button size="small" variant="contained" color="primary" component={Link} to="/lostPassword"  >
                {t('button.resetPassword')}
            </Button>
        </WindowForm>
    }

    if(message) {
        return <WindowForm >
            <Alert severity="success" className={classes.alert}>{message}</Alert>
            <Button size="small" className={classes.back} component={Link} to="/" startIcon={<ArrowBack />} >
                {t('button.login')}
            </Button>
        </WindowForm>
    }

    return (<WindowForm >
        <Form onSubmit={(values,form) => submit(values,form)}
            validate={(values) => {
                const errors = {}
                errors.password = validator(values.password,tError, required, passwordComplexity)
                errors.confirmPassword = validator(values.confirmPassword,tError, required, mustBeIdentical(values.password))
                return errors
            }
            }
            initialValues={{
                password: '',
                confirmPassword: '',
            }}
            render={({ handleSubmit, pristine, submitting }) => (
                <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
                    <Field
                        name="password"
                        label={t('field.newPassword')}
                        component={TextField}
                        fullWidth
                        required
                        type="password"
                    />
                    <Field
                        name="confirmPassword"
                        label={t('field.confirmPassword')}
                        component={TextField}
                        fullWidth
                        required
                        type="password"
                    />
                    <Button fullWidth variant="contained" color="primary" type="submit" disabled={submitting || pristine}
                        className={classes.submit}>{t('button.confirm')}</Button>
                    <Button size="small" className={classes.back} component={Link} to="/" startIcon={<ArrowBack />} >
                        {t('button.login')}
                    </Button>
                </form>
            )} />
    </WindowForm>)

}

export default LostPasswordScene
