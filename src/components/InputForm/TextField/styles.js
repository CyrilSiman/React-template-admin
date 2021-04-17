import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    formControlMargin : {
        marginTop : theme.spacing(1),
    },
    input :{
        '&$disabled': {
            color: theme.palette.text.primary,
            cursor: 'default',
        },
        '&$disabled:before': {
            borderBottomStyle : 'none',
            borderBottomWidth : 1,
            borderBottomColor: grey[200],
        },
    },
    disabled: {},
    formHelper:{
        marginTop: 2,
        fontStyle : 'italic',
    },
    formHelperDisabled: {
        marginTop : 0,
        marginBottom : 0,
    },
})
)

export default useStyles