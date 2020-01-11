import React, { useState } from 'react'
import {Form, Field} from 'react-final-form'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'

import TextField from 'ROOT/components/InputForm/TextField'
import Button from '@material-ui/core/Button/Button'
import WindowForm from 'ROOT/components/Window'
import {Link} from 'react-router-dom'

import validator, { mustBeAnEmail, required } from 'ROOT/services/validator'

import ArrowBack from 'mdi-material-ui/ArrowLeft'
import {sendResetPasswordLink} from 'ROOT/services/graphql/auth.graphql'

import styles from './styles'
import { hasError } from 'ROOT/services/utils'
import constants from 'ROOT/services/constants'
import { useSnackbar } from 'notistack'
import Alert from '@material-ui/lab/Alert'

const LostPasswordScene = (props) => {

    let {classes} = props
    const [showInstruction,setShowInstruction] = useState(false)
    const { t } = useTranslation('auth')
    const { t:tError } = useTranslation('errors')
    const { enqueueSnackbar } = useSnackbar()

    const [resetPasswordMutation] = useMutation(sendResetPasswordLink)

    const submit = async (values,form) => {
        setShowInstruction(false)
        try {
            await resetPasswordMutation({ variables: { email: values.email } })
            setTimeout(form.reset)
            setShowInstruction(true)
        } catch (error) {
            if(hasError(error,constants.ERROR_CODE_USER_DONT_MATCH)) {
                return { email: tError('resetPasswordUserNotExist') }
            } else {
                enqueueSnackbar(tError('unknownError'),{variant:'error'})
            }
        }
    }

    return (<WindowForm >
        {showInstruction &&
        <Alert severity="success" className={classes.alert}>{t('followInstructionInEmail')}</Alert>}
        <Form onSubmit={(values,form) => submit(values,form)}
              initialValues={{email: ''}}
              validate={values => {
                  const errors = {}
                  errors.email = validator(values.email,tError, required, mustBeAnEmail)
                  return errors
              }}
              render={({handleSubmit, pristine, submitting}) => (
                  <form onSubmit={handleSubmit} className={classes.form} autoComplete='off'>
                      <Field name='email' component={TextField} type='text' fullWidth
                             label={t('field.email')} autoComplete='email' required />
                      <Button fullWidth variant='contained' color='primary' type='submit' disabled={submitting || pristine}
                              className={classes.submit}>{t('button.resetPassword')}</Button>
                      <Button size='small' className={classes.back} component={Link} to='/' startIcon={<ArrowBack />} >
                          {t('button.back')}
                      </Button>
                  </form>
              )}/>
    </WindowForm>)

}

export default withStyles(styles)(LostPasswordScene)
