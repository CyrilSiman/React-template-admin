import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Box  from '@material-ui/core/Box'

import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'

const Window = (props) => {
    const { t } = useTranslation('global')
    let { classes, title } = props

    return (
        <main className={classes.wrapperPage}>
            <Paper className={classes.paper} elevation={10}>
                <Box className={classes.logoBox}>
                    <Typography component='h1' variant='h5'>
                        <a href='/' className='logo logo-admin'>
                            <img src='/img/logoApp.svg' height='60' alt='logo' />
                        </a>
                    </Typography>
                    {title && <Typography component='h1' variant='h6'>
                        {t('appName')}
                    </Typography>}
                </Box>
                {props.children}
            </Paper>
        </main>)

}

Window.propTypes = {
    title:PropTypes.bool,
    classes:PropTypes.object,
}

export default withStyles(styles)(Window)