import React from 'react'
import { withStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'

import Dialog from '@material-ui/core/Dialog'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

import InformationForm from 'ROOT/scenes/profile/components/InformationForm'
import PasswordForm from 'ROOT/scenes/profile/components/PasswordForm'

import {meQuery} from 'ROOT/services/graphql/auth.graphql'

import styles from './styles'

function tabProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const ProfileDialog = (props) => {

    const {classes, onClose} = props
    const {t} = useTranslation('profile')
    const {data:dataMe, loading:loadingMe} = useQuery(meQuery)
    const [value, setValue] = React.useState(0)

    if(loadingMe) {
        return <div>&nbsp;</div>
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Dialog
            open={true}
            onClose={props.onClose}
            scroll='paper'
            aria-labelledby={t('dialogTitle')}
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle disableTypography >
                <Typography variant="h6">{t('dialogTitle')}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent>
                <div className={classes.root} >
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Informations" {...tabProps(0)} classes={{root:classes.tab, wrapper:classes.tabWrapper}}/>
                        <Tab label="Password" {...tabProps(1)} classes={{root:classes.tab, wrapper:classes.tabWrapper}}/>
                    </Tabs>
                    <div className={classes.tabPanelContainer}>
                        {value === 0 && <InformationForm me={dataMe.me} role="tabpanel" id='vertical-tabpanel-0' />}
                        {value === 1 && <PasswordForm role="tabpanel" id='vertical-tabpanel-1' />}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default withStyles(styles)(ProfileDialog)