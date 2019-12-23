import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {withStyles} from '@material-ui/styles'
import { AgGridReact } from 'ag-grid-react'

import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LinearProgress from '@material-ui/core/LinearProgress'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'

import Link from 'ROOT/components/Link'

import {teamsQuery} from 'ROOT/services/graphql/teams.graphql'

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
        suppressSizeToFit: false,
        width: 130,
    },
    {
        headerName: t('listing.column.name'),
        field: 'lastName',
        suppressSizeToFit: false,
        width: 130,
    },
    {
        headerName: t('listing.column.createdAt'),
        field: 'createdAt',
        suppressSizeToFit: false,
        width: 130,
    },
]

const Main = (props) => {

    const { classes } = props
    const {data:dataTeams, loading: loadingTeams, error:errorTeams} = useQuery(teamsQuery)
    const {t} = useTranslation('teams')
    const [dialogCreateTeamOpened,setDialogCreateTeamOpened] = useState(false)

    return (
        <Fragment>
            {loadingTeams ? <LinearProgress/> : <div style={{height: '4px'}}></div>}
            <div className={classes.content}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to={routes.PRIVATE_DASHBOARD}>
                        MyApp
                    </Link>
                    <Link color="inherit" to={routes.PRIVATE_TEAMS}>
                        Teams
                    </Link>
                </Breadcrumbs>
                <Paper className={classes.tablePaper}>
                    <Box display="flex" flexDirection="row-reverse">
                        <Tooltip title={t('button.addTeam')}
                                 aria-label={t('button.addTeam')} placement="right">
                            <Fab color="primary" aria-label={t('button.addTeam')} className={classes.addButton}
                                 onClick={() => setDialogCreateTeamOpened(true)} size="medium">
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
                            rowData={errorTeams || loadingTeams ? null : dataTeams.teams}
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

export default withStyles(styles)(Main)