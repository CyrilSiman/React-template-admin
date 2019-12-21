import React from 'react'
import {Form, Field} from 'react-final-form'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'
import TextField from 'ROOT/components/TextField'
import Button from '@material-ui/core/Button/Button'
import WindowForm from '../../components/windowForm'
import SnackBar from 'ROOT/components/SnackBar'
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'

class LoostPasswordScene extends React.Component {

    constructor(props) {
        super(props)
        this.state = {error: '', loading:false, success : false}
    }

    submit = values => {
        //this.sendTokenToResetPassword(values.email)
        //this.props.lostPassword(values.email)
    }

    render() {

        let {classes} = this.props
        let {loading, error, success} = this.state

        let submitButton = <Button fullWidth variant='contained' color='primary' type='submit'
                                   className={classes.submit}>Réinitialiser le mot de passe</Button>
        if (loading) {
            submitButton =
                <Button fullWidth variant='contained' color='primary' type='submit' className={classes.submit} disabled>
                    <i className='fa fa-refresh fa-spin'></i>
                </Button>
        }

        let snack
        if(error) {
            let message = 'Aucun compte associé a cet émail, merci de vérifier l\'émail saisi.'
            snack = <SnackBar variant='error' message={message} open={true} />
        } else if (success) {
            let message = 'Un mail vient de vous être adressé contenant la procédure pour réinitialiser votre mot de passe.'
            snack = <SnackBar variant='success' message={message} open={true} />
        }

        return (<WindowForm >
            <Form onSubmit={this.submit}
                  initialValues={{email: '', password: ''}}
                  render={({handleSubmit, reset, submitting, pristine, values}) => (
                      <form onSubmit={handleSubmit} className={classes.form} autoComplete='off'>
                          {snack}
                          <Field name='email' component={TextField} type='text' className=''
                                 label='Email' autoComplete='email'/>
                          {submitButton}
                          <Button size='small' className={classes.back} component={Link} to='/' >
                              <Icon className={classes.leftIcon}>arrow_back</Icon>
                              Retour
                          </Button>
                      </form>
                  )}/>
        </WindowForm>)
    }
}

export default withStyles(styles)(LoostPasswordScene)
