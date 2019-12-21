import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import { Field, Form } from 'react-final-form'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from 'ROOT/components/InputForm/TextField'

import WindowForm from 'ROOT/components/Window'

import {createRootUserMutation} from 'ROOT/services/graphql/appConfig.graphql'

import styles from './styles'

const AppInitScene = (props) => {

    let { classes } = props
    let history = useHistory()
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('appInit')

    const [appInitMutation, { loading: mutationLoading }] = useMutation(createRootUserMutation, {
        onCompleted: (data) => {
            if(data.createRootUser){
                history.push('/')
            } else {
                enqueueSnackbar(t('creationFailed'),{variant:'error'})
            }
        },
        onError: (error) => {
            enqueueSnackbar(t('creationFailed'),{variant:'error'})
        }
    })

    const submit = (values) => {
        appInitMutation({ variables: { secret:values.secret, email: values.email, password: values.password } })
    }

    return <WindowForm>
        <Typography style={{margin:20}}>{t('message')}</Typography>
        <Form onSubmit={(values) => submit(values)}
              initialValues={{ secret:'', email: '', password: '' }}
              validate={values => {
                  const errors = {}
                  if (!values.secret) {
                      errors.secret = 'Required'
                  }
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
                      <Field name='secret' component={TextField} type='password' className=''
                             label={t('field.secret')} autoComplete='secret' fullWidth />
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
                              className={classes.submit}>{t('button.configure')}</Button>
                      }
                  </form>
              )} />
    </WindowForm>
}

export default withStyles(styles)(AppInitScene)
