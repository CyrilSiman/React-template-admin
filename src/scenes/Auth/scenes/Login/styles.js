import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    submit: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    lostPassword: {
        color : theme.palette.grey['600'],
    },
})
)

export default useStyles