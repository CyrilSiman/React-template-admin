import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: theme.drawerWidth,
            flexShrink: 0,
        },
    },
    appContent: {
        flex: 1,
        backgroundColor : theme.mainBackgroundColor,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.drawerWidth,
        },
    },
}))

export default useStyles