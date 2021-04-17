import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Box  from '@material-ui/core/Box'

import useStyles from './styles'

const Window = (props) => {
    const { t } = useTranslation('global')
    const { title, children } = props

    const classes = useStyles()

    return (
        <main className={classes.wrapperPage}>
            <Paper className={classes.paper} elevation={10}>
                <Box className={classes.logoBox}>
                    <Typography component="h1" variant="h5">
                        <a href="/" className="logo logo-admin">
                            <img src="/img/logoApp.svg" height="60" alt="logo" />
                        </a>
                    </Typography>
                    {title && <Typography component="h1" variant="h6">
                        {t('appName')}
                    </Typography>}
                </Box>
                {children}
            </Paper>
        </main>)

}

Window.propTypes = {
    title:PropTypes.bool,
    children:PropTypes.any.isRequired,
}

export default Window