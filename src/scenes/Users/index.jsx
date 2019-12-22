import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {withStyles} from '@material-ui/styles'

import { AgGridReact } from 'ag-grid-react'

import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LinearProgress from '@material-ui/core/LinearProgress'

import {usersQuery} from 'ROOT/services/graphql/users.graphql'

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
        headerName: t('listing.column.lastname'),
        field: 'lastName',
        suppressSizeToFit: false,
        width: 130,
    },
    {
        headerName: t('listing.column.firstname'),
        field: 'firstName',
        suppressSizeToFit: false,
        width: 130,
    },
    {
        headerName: 'Type',
        field: 'client_type_rid',
        suppressSizeToFit: false,
        width: 50,
    },
    {
        headerName: 'Statut',
        field: 'clientStatus',
        suppressSizeToFit: false,
        width: 50,
    }
]

const Main = (props) => {

    const { classes } = props
    const {data:dataUsers, loading: loadingUsers, error:errorUsers} = useQuery(usersQuery)
    const {t} = useTranslation('users')

    return (
        <Fragment>
            {loadingUsers ? <LinearProgress/> : <div style={{height: '4px'}}></div>}
            <div className={classes.content}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/" onClick={() => console.log('la')}>
                        MyApp
                    </Link>
                    <Link color="inherit" href="/getting-started/installation/" onClick={() => console.log('la')}>
                        Users
                    </Link>
                </Breadcrumbs>
                <Paper className={classes.tablePaper}>
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