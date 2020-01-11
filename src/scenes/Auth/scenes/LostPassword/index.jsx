import React from 'react'
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

const LostPasswordScene = (props) => {

    let {classes} = props
    const { t } = useTranslation('auth')
    const { t:tError } = useTranslation('errors')

    const [resetPasswordMutation] = useMutation(sendResetPasswordLink, {
        onCompleted:(data) => {
            if(data.lostPasswordMutation.sucess) {
            } else {
            }
        },
        onError:() => {}
    })

    const submit = (values) => {
        resetPasswordMutation({ variables: { email: values.email } })
    }

    return (<WindowForm >
        <Form onSubmit={(values) => submit(values)}
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
