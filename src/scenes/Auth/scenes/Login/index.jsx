import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import formatDistance from 'date-fns/formatDistance'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from 'ROOT/components/InputForm/TextField'
import Button from '@material-ui/core/Button/Button'
import { LockQuestion } from 'mdi-material-ui'

import WindowForm from 'ROOT/components/Window'

import routes from 'ROOT/routes'
import useStyles from './styles'
import { loginQuery } from 'ROOT/services/graphql/auth.graphql'
import constants from 'ROOT/services/constants'

const LoginScene = () => {

    const classes = useStyles()
    const history = useHistory()
    const { t } = useTranslation('auth')

    const [loginMutation, { loading: mutationLoading, data:dataLogin, error : errorMutation }] = useMutation(loginQuery, {
        onCompleted: (data) => {
            if(data.login && data.login.authenticated) {
                localStorage.setItem(constants.IS_AUTHENTICATED, 'true')
                history.push(routes.PRIVATE_DASHBOARD)
            }
        },
        onError: () => {
            //Necessary to fix Appolo Client error
        },
    })

    const submit = (values) => {
        loginMutation({ variables: { email: values.email, password: values.password } })
    }

    let message = null
    if(dataLogin) {
        if(dataLogin.login.tryLeft) {
            message = <Typography style={{ margin:20 }} color={'error'}>{t('tryLeftBeforeBlock',{ count:dataLogin.login.tryLeft })}</Typography>
        }
        if(dataLogin.login.retryAfter) {
            const value = formatDistance(0, dataLogin.login.retryAfter * 1000, { includeSeconds: true })
            message = <Typography style={{ margin:20 }} color={'error'}>{t('blockDuration',{ duration:value })}</Typography>
        }
    }

    return <WindowForm title>
        {message}
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
                <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
                    {errorMutation && <Typography variant="subtitle2" color="error" align={'center'}>{t('authenticationFailed')}</Typography>}
                    <Field name="email" component={TextField} type="text" className=""
                        label={t('field.email')} autoComplete="email" fullWidth />
                    <Field name="password" component={TextField} type="password"
                        className="" label={t('field.password')} autoComplete="off" fullWidth />
                    {mutationLoading &&
                      <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}
                          disabled >
                          <CircularProgress size={22} />
                      </Button>
                    }
                    {!mutationLoading &&
                      <Button fullWidth variant="contained" color="primary" type="submit"
                          className={classes.submit}>{t('button.login')}</Button>
                    }
                    <Button size="small" className={classes.lostPassword} component={Link} to="/lostPassword" startIcon={<LockQuestion />}>
                        {t('lostPassword')}
                    </Button>
                </form>
            )} />
    </WindowForm>
}

export default LoginScene
