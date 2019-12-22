const styles = (theme) => ({
    inputLabel: {
        fontSize:'0.8rem',
    },
    paperRoot: {
        borderRadius: '3px',
        backgroundColor: '#ffffff',
        width: '200px',
        padding : 0,
        overflow:'none'
    },
    divider: {
        backgroundColor:'gray'
    },
    valueContainer : {
    },
    boxHeader : {
        backgroundColor:'#eee'
    },
    inputFormControl : {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    input : {
        width:'144px',
        fontSize:'0.8rem',
        boxSizing: 'content-box',
        '&:focus' : {
            boxSizing: 'content-box',
        }
    },
    divViewport : {
        overflow: 'auto'
    },
})

export default styles