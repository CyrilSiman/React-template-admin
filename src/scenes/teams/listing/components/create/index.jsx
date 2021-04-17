import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import validator, { required } from 'ROOT/services/validator'
import { Field, Form } from 'react-final-form'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'

import JTextField from 'ROOT/components/InputForm/TextField'

import { createTeam,teamsQuery } from 'ROOT/services/graphql/teams.graphql'

import { hasError } from 'ROOT/services/utils'
import constants from 'ROOT/services/constants'
import useStyles from './styles'
import { useSnackbar } from 'notistack'

const CreateDialog = (props) => {

    const { onClose } = props
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('teams')
    const { t:tError } = useTranslation('errors')

    const [teamMutation] = useMutation(createTeam, {
        update : (cache, { data: { createTeam } }) => {
            const { teams } = cache.readQuery({ query: teamsQuery })
            cache.writeQuery({
                query: teamsQuery,
                data: { teams:teams.concat(createTeam) },
            })
        },
        onCompleted : () => {
            onClose()
        },
        onError: (error) => {
            if(hasError(error,constants.ERROR_CODE_DUPLICATE)) {
                enqueueSnackbar(tError('teamDuplicate'),{ variant:'error' })
            } else {
                enqueueSnackbar(tError('unknownError'),{ variant:'error' })
            }
        },
    })

    const submitForm = (values) => {
        teamMutation({
            variables:{
                name:values.name,
            },
        })
    }

    return (
        <Dialog
            open={true}
            onClose={onClose}
            scroll="paper"
            aria-labelledby={t('dialogCreate')}
            fullWidth={true}
            maxWidth={'sm'}
        ><Form
                onSubmit={submitForm}
                validate={values => {
                    const errors = {}
                    errors.name = validator(values.name,tError, required)
                    return errors
                }
                }
                initialValues={{
                    name: '',
                }}
                render={({ handleSubmit, pristine, submitting }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle} >{t('dialogCreate')}</DialogTitle>
                        <DialogContent>
                            <Grid container className={classes.detailMain} spacing={1}>
                                <Grid item xs={12}>
                                    <Field
                                        name="name"
                                        label={t('field.name')}
                                        component={JTextField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} disabled={submitting} variant="contained">
                                {t('button.cancel')}
                            </Button>
                            <Button type="submit" color="primary" disabled={submitting || pristine}
                                variant="contained">
                                {t('button.add')}
                            </Button>
                        </DialogActions>
                    </form>
                )
                } />
        </Dialog>
    )
}

export default CreateDialog

CreateDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
}