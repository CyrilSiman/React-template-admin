const styles = theme => ({
    detailMain: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    divButton : {
        flex: '0 0 auto',
        display: 'flex',
        marginTop : theme.spacing(2),
        padding: '8px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& > :not(:first-child)' : {
            marginLeft: '8px',
        }
    }
})

export default styles