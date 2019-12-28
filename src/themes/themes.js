import {createMuiTheme} from '@material-ui/core'

let theme = createMuiTheme({
    typography: {
        fontSize:13,
        useNextVariants: true,
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    palette: {
        primary: {
            light: '#4dabf5', //
            main: '#2196f3',//'#009be5',
            dark: '#1769aa',
        },
    },
    shape: {
        borderRadius: 3,
    },
})

export const defaultTheme = {
    ...theme,
    drawerWidth:256,
    mainBackgroundColor:'#faf8fb',
    leftMenu: {
        selectedItemCircle:'#dddddd', //67B9fa
        selectedItemColor:'#ffffff',
        selectedItemBoxShadow: 'inset 4px 0 0 #f73378', //4799da
    },
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#1769aa',
                backgroundImage: 'linear-gradient(270deg,rgba(51,148,225,.5),transparent)'
            },
        },
        MuiButton: {
            label: {
                textTransform: 'initial',
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        },
        MuiTabs: {
            root: {
                marginLeft: theme.spacing(1),
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                backgroundColor: theme.palette.secondary,
            },
        },
        MuiTab: {
            root: {
                textTransform: 'initial',
                minWidth: 0,
                /*[theme.breakpoints.up('md')]: {
                    minWidth: 0,
                },*/
            },
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing(1),
            },
        },
        MuiTooltip: {
            tooltip: {
                fontSize:11,
                borderRadius: 4,
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#404854',
            },
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32,
            },
        },
        MuiAppBar: {
            colorPrimary: {
                color:'#2196f3',
                backgroundColor: '#ffffff',
            }
        },
        MuiBreadcrumbs: {
            root: {
                fontSize:12,
            },
            li: {
                fontSize:12,
            }
        }
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
}