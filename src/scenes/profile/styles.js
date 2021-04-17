import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    divider : {
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2),
        marginLeft : theme.spacing(1),
        marginRight : theme.spacing(1),
        backgroundColor:grey.brighter,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 350,
    },
    tabs : {
        width:130,
        marginLeft:0,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab : {
        minWidth:100,
        paddingRight: 20,
    },
    tabPanelContainer : {
        width: 'calc(100% - 130px)',
        paddingLeft:theme.spacing(1),
    },
    tabWrapper : {
        alignItems:'flex-end',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})
)
export default useStyles