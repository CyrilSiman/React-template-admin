import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    content: {
        margin: theme.spacing(3),
    },
    tablePaper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
    },
    addButton : {
        marginLeft: -30,
        marginTop: -40,
        zIndex: 2,
    },
})
)

export default useStyles