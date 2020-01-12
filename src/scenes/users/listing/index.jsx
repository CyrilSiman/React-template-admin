import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {withStyles} from '@material-ui/styles'

import { AgGridReact } from 'ag-grid-react'

import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LinearProgress from '@material-ui/core/LinearProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Box from '@material-ui/core/Box'

import CheckCellRender from 'ROOT/components/agGrid/CheckCellRender'

import {usersQuery} from 'ROOT/services/graphql/users.graphql'
import routes from 'ROOT/routes'

import styles from './styles'
import { useTranslation } from 'react-i18next'


const defaultColDef = {
    suppressMenu: true,
    sortable: true,
    filter: true,
    resizable: false,
    suppressSizeToFit: false,
    width: 50,
}
const columnTypes = {
    'statusStyle': {
        cellStyle: (params) => {
            return {textAlign: 'center', backgroundColor: '#f5f5f5'}
        },
    },
}
const columnDefs = (t) => [
    {
        headerName: t('listing.column.id'),
        field: '_id',
        width: 130,
    },
    {
        headerName: t('listing.column.lastname'),
        field: 'lastName',
        width: 130,
    },
    {
        headerName: t('listing.column.firstname'),
        field: 'firstName',
        width: 130,
    },
    {
        headerName: t('listing.column.isAdmin'),
        field: 'isAdmin',
        cellRenderer: 'checkCellRender',
    },
]

const Main = (props) => {

    const { classes } = props
    const {data:dataUsers, loading: loadingUsers, error:errorUsers} = useQuery(usersQuery)
    const {t} = useTranslation('users')
    const [,setDialogCreateUserOpened] = useState(false)

    return (
        <Fragment>
            {loadingUsers ? <LinearProgress/> : <div style={{height: '4px'}}></div>}
            <div className={classes.content}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to={routes.PRIVATE_DASHBOARD}>
                        MyApp
                    </Link>
                    <Link color="inherit" to={routes.PRIVATE_USERS}>
                        Users
                    </Link>
                </Breadcrumbs>
                <Paper className={classes.tablePaper}>
                    <Box display="flex" flexDirection="row-reverse">
                        <Tooltip title="Inviter un prescripteur"
                                 aria-label="Inviter un prescripteur" placement="right">
                            <Fab color="primary" aria-label="Add" className={classes.addButton}
                                 onClick={() => setDialogCreateUserOpened(true)} size="medium">
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </Box>


                    <div id="myGrid"
                         className="ag-theme-material"
                         style={{
                             height: '553px', width: '100%', padding: 8 * 3
                         }}
                    >
                        <AgGridReact
                            columnDefs={columnDefs(t)}
                            defaultColDef={defaultColDef}
                            columnTypes={columnTypes}
                            rowData={errorUsers || loadingUsers ? null : dataUsers.users}
                            suppressCellSelection={true}
                            suppressRowClickSelection={true}
                            suppressMovableColumns={true}
                            floatingFilter={true}
                            pagination={true}
                            paginationAutoPageSize={true}
                            rowHeight={40}
                            rowSelection='single'
                            headerHeight={40}
                            floatingFiltersHeight={40}
                            onGridReady={(params) => params.api.sizeColumnsToFit()}
                            onGridSizeChanged={(params) => {
                                params.api.sizeColumnsToFit()
                            }}
                            frameworkComponents={{
                                checkCellRender: CheckCellRender
                            }}
                        />
                    </div>

                </Paper>
            </div>
        </Fragment>
    )
}

/*
<Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={() => console.log('la')}>
                    MyApp
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={() => console.log('la')}>
                    Main
                </Link>
                <Typography color="textPrimary" style={{fontSize:13}}>Page One</Typography>
            </Breadcrumbs>
 */

export default withStyles(styles)(Main)