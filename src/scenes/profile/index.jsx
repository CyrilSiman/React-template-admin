import React from 'react'
import { withStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'

import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'

import InformationForm from 'ROOT/scenes/profile/components/InformationForm'
import PasswordForm from 'ROOT/scenes/profile/components/PasswordForm'

import {meQuery} from 'ROOT/services/graphql/auth.graphql'

import styles from './styles'

const ProfileDialog = (props) => {

    const {classes, onClose} = props
    const {t} = useTranslation('profile')
    const {data:dataMe, loading:loadingMe} = useQuery(meQuery)

    if(loadingMe) {
        return <div>&nbsp;</div>
    }

    return (
        <Dialog
            open={true}
            onClose={props.onClose}
            scroll='paper'
            aria-labelledby={t('dialogTitle')}
        >
            <InformationForm me={dataMe.me} onClose={onClose}/>
            <Divider className={classes.divider} variant="middle" light/>
            <PasswordForm onClose={onClose} />
        </Dialog>
    )
}

export default withStyles(styles)(ProfileDialog)