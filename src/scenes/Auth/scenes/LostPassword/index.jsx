import React from 'react'
import {Form, Field} from 'react-final-form'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'
import TextField from 'ROOT/components/InputForm/TextField'
import Button from '@material-ui/core/Button/Button'
import WindowForm from 'ROOT/components/Window'
import SnackBar from 'ROOT/components/SnackBar'
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import { useMutation } from '@apollo/react-hooks'
import {resetPassword} from 'ROOT/services/graphql/auth.graphql'

const LostPasswordScene = (props) => {

    let {classes} = props

    const [resetPasswordMutation, { loading: resetPasswordLoading, error: errorResetpasword }] = useMutation(resetPassword, {
        onCompleted:(data) => {
            if(data.lostPasswordMutation.sucess) {
                let message = 'Un mail vient de vous être adressé contenant la procédure pour réinitialiser votre mot de passe.'
                //let snack = <SnackBar variant='success' message={message} open={true} />
            } else {
                let message = 'Aucun compte associé a cet émail, merci de vérifier l\'émail saisi.'
                //let snack = <SnackBar variant='error' message={message} open={true} />
            }
        },
        onError:() => {}
    })

    const submit = (values) => {
        resetPasswordMutation({ variables: { login: values.email } })
    }

    return (<WindowForm >
        <Form onSubmit={(values) => submit(values)}
              initialValues={{email: '', password: ''}}
              render={({handleSubmit}) => (
                  <form onSubmit={handleSubmit} className={classes.form} autoComplete='off'>
                      <Field name='email' component={TextField} type='text' fullWidth
                             label='Email' autoComplete='email'/>
                      {errorResetpasword &&
                        <div>Impossible de changer le mot de passe</div>
                      }
                      {resetPasswordLoading &&
                      <Button fullWidth variant='contained' color='primary' type='submit' className={classes.submit}
                              disabled>
                          <i className='fa fa-refresh fa-spin' />
                      </Button>
                      }
                      {!resetPasswordLoading &&
                      <Button fullWidth variant='contained' color='primary' type='submit'
                              className={classes.submit}>Reset password</Button>
                      }
                      <Button size='small' className={classes.back} component={Link} to='/' >
                          <Icon className={classes.leftIcon}>arrow_back</Icon>
                          Retour
                      </Button>
                  </form>
              )}/>
    </WindowForm>)

}

export default withStyles(styles)(LostPasswordScene)
