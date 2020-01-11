import React from 'react'
import {Form, Field} from 'react-final-form'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import TextField from 'ROOT/components/InputForm/TextField'
import Button from '@material-ui/core/Button/Button'
import WindowForm from 'ROOT/components/Window'
import {Link, useParams} from 'react-router-dom'

import validator, { mustBeIdentical, passwordComplexity, required } from 'ROOT/services/validator'

import ArrowBack from 'mdi-material-ui/ArrowLeft'
import {sendResetPasswordLink} from 'ROOT/services/graphql/auth.graphql'

import styles from './styles'

const LostPasswordScene = (props) => {

    let {classes} = props
    const { t } = useTranslation('auth')
    let { token } = useParams()
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
        console.log(values)
        //resetPasswordMutation({ variables: { password: values.email, token:token } })
    }

    return (<WindowForm >
        <Typography component='body1'>Set your new password</Typography>
        <Form onSubmit={(values) => submit(values)}
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
              render={({handleSubmit, pristine, submitting}) => (
                  <form onSubmit={handleSubmit} className={classes.form} autoComplete='off'>
                      <Field
                          name="password"
                          label={t('field.password')}
                          component={TextField}
                          fullWidth
                          required
                          type='password'
                      />
                      <Field
                          name="confirmPassword"
                          label={t('field.confirmPassword')}
                          component={TextField}
                          fullWidth
                          required
                          type='password'
                      />
                      <Button fullWidth variant='contained' color='primary' type='submit' disabled={submitting || pristine}
                              className={classes.submit}>{t('button.confirm')}</Button>
                      <Button size='small' className={classes.back} component={Link} to='/' startIcon={<ArrowBack />} >
                          {t('button.login')}
                      </Button>
                  </form>
              )}/>
    </WindowForm>)

}

export default withStyles(styles)(LostPasswordScene)
