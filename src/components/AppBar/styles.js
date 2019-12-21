const lightColor = 'rgba(255, 255, 255, 0.7)'

const styles = theme => ({
    menuButton: {
        marginLeft: -theme.spacing(),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
    header : {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
})

export default styles