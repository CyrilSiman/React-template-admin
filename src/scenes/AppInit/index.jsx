import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'

import { useApolloClient, useMutation } from '@apollo/react-hooks'

import withStyles from '@material-ui/core/styles/withStyles'

import TextField from 'ROOT/components/InputForm/TextField'
import Button from '@material-ui/core/Button/Button'
import { LockQuestion } from 'mdi-material-ui'

import WindowForm from 'ROOT/components/Window'
import SnackBar from 'ROOT/components/SnackBar'

import styles from './styles'
import { login as loginQuery, me as meQuery } from 'ROOT/services/graphql/auth.graphql'

const LoginScene = (props) => {

    let { classes } = props
    let history = useHistory()
    const { t } = useTranslation('login')
    const client = useApolloClient()

    const [loginMutation, { loading: mutationLoading, error : errorMutation }] = useMutation(loginQuery, {
        onCompleted: (data) => {
            //client.writeData({ data: { connected: true } })
            client.writeData({ data: { isLoggedIn: true } })
            //const access_token = data.login
            //localStorage.setItem(constants.AUTH_TOKEN, access_token)
            history.push('/')
        },
        onError: (error) => {
            //Necessary to fix Appolo Client error
        }
    })

    const submit = (values) => {
        loginMutation({ variables: { email: values.email, password: values.password } })
    }

    return <WindowForm>
        <Form onSubmit={(values) => submit(values)}
              initialValues={{ email: '', password: '' }}
              validate={values => {
                  const errors = {}
                  if (!values.email) {
                      errors.email = 'Required'
                  }
                  if (!values.password) {
                      errors.password = 'Required'
                  }
                  return errors
              }}
              render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className={classes.form} autoComplete='off'>
                      {errorMutation && <SnackBar variant='error' message='aie aie' open={true} />}
                      <Field name='email' component={TextField} type='text' className=''
                             label={t('field.email')} autoComplete='email' fullWidth />
                      <Field name='password' component={TextField} type='password'
                             className='' label={t('field.password')} autoComplete='off' fullWidth />
                      {mutationLoading &&
                      <Button fullWidth variant='contained' color='primary' type='submit' className={classes.submit}
                              disabled>
                          <i className='fa fa-refresh fa-spin' />
                      </Button>
                      }
                      {!mutationLoading &&
                      <Button fullWidth variant='contained' color='primary' type='submit'
                              className={classes.submit}>{t('button.login')}</Button>
                      }
                      <Button size='small' className={classes.lostPassword} component={Link} to='/lostPassword'>
                          <LockQuestion className={classes.leftIcon} />
                          {t('lostPassword')}
                      </Button>
                  </form>
              )} />
    </WindowForm>
}

export default withStyles(styles)(LoginScene)
