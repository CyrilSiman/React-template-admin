import React from 'react'
import {ApolloConsumer, Mutation} from 'react-apollo'
import {Link, withRouter} from 'react-router-dom'
import {Field, Form} from 'react-final-form'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'
import TextField from 'ROOT/components/TextField'
import Button from '@material-ui/core/Button/Button'
import Icon from '@material-ui/core/Icon'
import WindowForm from '../../components/windowForm'
import SnackBar from 'ROOT/components/SnackBar'
import constants from 'ROOT/services/constants'
import LoginOperator from 'ROOT/services/graphql/auth.graphql'

class LoginScene extends React.Component {

    constructor(props) {
        super(props)
        this._confirm = this._confirm.bind(this)
        //  this.noDataCell = this.noDataCell.bind(this)
    }

    _submit = mutation => values => {
        mutation({variables : {login: values.email, password : values.password}})
        //variables={{ v: Math.random() }}
    }
    _confirm = async (client,data) => {
        const { access_token } = data.operatorLogin
        localStorage.setItem(constants.AUTH_TOKEN, access_token)
        //client.writeData({ data: { isLoggedIn: true } })
        this.props.history.push('/')
        //navigate(routes.PATH_DASHBOARD)
    }

    render() {

        let {classes} = this.props

        return (
            <ApolloConsumer>
                {client => (
                    <Mutation
                        mutation={LoginOperator}
                        onCompleted={data => this._confirm(client, data)} >
                        {(mutation,{loading,error}) => (
                            <WindowForm>
                                <Form onSubmit={this._submit(mutation)}
                                      initialValues={{email: '', password: ''}}
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
                                      render={({handleSubmit}) => (
                                          <form onSubmit={handleSubmit} className={classes.form} autoComplete='off'>
                                              {error && <SnackBar variant='error' message='aie aie' open={true} />}
                                              <Field name='email' component={TextField} type='text' className=''
                                                     label='Email' autoComplete='email'/>
                                              <Field name='password' component={TextField} type='password'
                                                     className='' label='Password' autoComplete='off'/>
                                              {loading &&
                                                <Button fullWidth variant='contained' color='primary' type='submit' className={classes.submit} disabled>
                                                  <i className='fa fa-refresh fa-spin' />
                                                </Button>
                                              }
                                              {!loading &&
                                                <Button fullWidth variant='contained' color='primary' type='submit'
                                                      className={classes.submit}>Log In</Button>
                                              }
                                              <Button size='small' className={classes.lostPassword} component={Link} to='/lostPassword' >
                                                  <Icon className={classes.leftIcon}>lock</Icon>
                                                  Mot de passe oublié ?
                                              </Button>
                                          </form>
                                      )}/>
                            </WindowForm>
                        )
                        }
                    </Mutation>
                )}
            </ApolloConsumer>
        )
    }
}

export default withRouter(withStyles(styles)(LoginScene))
