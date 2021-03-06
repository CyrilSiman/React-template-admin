import React, { Fragment, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'

import { AgGridReact } from 'ag-grid-react'

import format from 'date-fns/format'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LinearProgress from '@material-ui/core/LinearProgress'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import { Checkbox } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import DeleteIcon from '@material-ui/icons/Delete'
import RefreshIcon from '@material-ui/icons/Refresh'
import IconButton from '@material-ui/core/IconButton'

import CheckBoxCellRender from 'ROOT/components/agGrid/CheckboxCellRender'

import Link from 'ROOT/components/Link'
import CreateTeam from './components/create'

import { capitalize } from 'ROOT/services/utils'

import { teamsQuery, deteteTeamsMutation } from 'ROOT/services/graphql/teams.graphql'

import routes from 'ROOT/routes'
import useStyles from './styles'

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
        cellStyle: () => {
            return { textAlign: 'center', backgroundColor: '#f5f5f5' }
        },
    },
}
const columnDefs = (t,tGlobal) => [
    {
        headerName: '',
        suppressMenu: true,
        sortable: false,
        filter: false,
        suppressSizeToFit: false,
        cellRenderer: 'checkBoxCellRender',
        width: 30,
    },
    {
        headerName: t('listing.column.id'),
        field: '_id',
        suppressSizeToFit: false,
        width: 130,
    },
    {
        headerName: t('listing.column.name'),
        field: 'name',
        suppressSizeToFit: false,
        valueFormatter: function (params) {
            return capitalize(params.value)
        },
        width: 130,
    },
    {
        headerName: t('listing.column.createdAt'),
        field: 'createdAt',
        valueFormatter: function (params) {
            return format(new Date(params.value),tGlobal('date.format1'))
        },
        width: 130,
    },
]

const TeamListing = () => {

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const { t:tError } = useTranslation('errors')
    const { t } = useTranslation('teams')
    const { t:tGlobal } = useTranslation('global')

    const { data:dataTeams, loading: loadingTeams, error:errorTeams, refetch:refreshTeams } = useQuery(teamsQuery,{ errorPolicy: 'all' })

    const [gridApi,setGridApi] = useState(null)
    const [elementSelectedState,setElementSelectedState] = useState({ elementSelected:false,allSelected:false })
    const [dialogCreateTeamOpened,setDialogCreateTeamOpened] = useState(false)

    const [deleteTeamMutation] = useMutation(deteteTeamsMutation,{
        onCompleted:() => {
            setElementSelectedState({ elementSelected:false,allSelected:false })
        },
        update : (cache, { data: { deleteTeams } }) => {
            const { teams } = cache.readQuery({ query: teamsQuery })
            const filteredTeam = teams.filter(team => !deleteTeams.includes(team._id))
            cache.writeQuery({
                query: teamsQuery,
                data: { teams:filteredTeam },
            })
        },
        onError: () => {
            enqueueSnackbar(tError('unknownError'),{ variant:'error' })
        },
    })

    const toggleSelectedAll = () => {

        if(gridApi) {
            const selectedNode = gridApi.getSelectedNodes()
            if(selectedNode.length > 0) {
                gridApi.deselectAll()
            } else {
                gridApi.selectAllFiltered()
            }
        }
        gridApi.refreshCells({ force:true })
    }

    const deleteTeams = () => {
        deleteTeamMutation({
            variables:{
                teamsId:gridApi.getSelectedNodes().map(node => node.data._id),
            },
        })
    }

    const showAddTeam = () => {
        gridApi.deselectAll()
        gridApi.refreshCells({ force:true })
        setElementSelectedState({ elementSelected:false,allSelected:false })
        setDialogCreateTeamOpened(true)
    }

    const onSelectionChange = () => {
        const rowLength = gridApi.getModel().getRootNode().allLeafChildren.length
        const selectedRowLength = gridApi.getSelectedNodes().length
        const newState = {
            elementSelected:false,
            allSelected:false,
        }
        if(selectedRowLength>0) {
            newState.elementSelected = true

            if(selectedRowLength === rowLength) {
                newState.allSelected = true
            }
        }

        setElementSelectedState(newState)
    }

    return (
        <Fragment>
            {loadingTeams ? <LinearProgress /> : <div style={{ height: '4px' }}></div>}
            {dialogCreateTeamOpened && <CreateTeam onClose={() => setDialogCreateTeamOpened(false)} />}
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
                                onClick={() => showAddTeam()} size="medium">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                    <Grid container >
                        <Tooltip title={t('button.selectAll')} onClick={() => toggleSelectedAll()}
                            aria-label={t('button.selectAll')} placement="bottom">
                            <Checkbox indeterminate={elementSelectedState.elementSelected && !elementSelectedState.allSelected} checked={elementSelectedState.elementSelected} style={{ marginLeft:15 }} />
                        </Tooltip>
                        <Divider orientation="vertical" className={classes.vDivider} />
                        {!elementSelectedState.elementSelected &&
                        <Zoom in={true}>
                            <Tooltip title={t('button.refresh')}
                                aria-label={t('button.refresh')} placement="bottom">
                                <IconButton aria-label="refresh" className={classes.margin} onClick={() => refreshTeams()}>
                                    <RefreshIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip></Zoom>}
                        {elementSelectedState.elementSelected &&
                        <Zoom in={true}>
                            <Tooltip title={t('button.delete')}
                                aria-label={t('button.refresh')} placement="bottom">
                                <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteTeams()}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip></Zoom>}
                    </Grid>
                    <div id="myGrid"
                        className="ag-theme-material"
                        style={{
                            height: '553px', width: '100%',
                        }}
                    >
                        <AgGridReact
                            columnDefs={columnDefs(t,tGlobal)}
                            defaultColDef={defaultColDef}
                            columnTypes={columnTypes}
                            rowData={errorTeams || loadingTeams || !dataTeams.teams ? null : [...dataTeams.teams]}
                            suppressCellSelection={true}
                            suppressRowClickSelection={true}
                            suppressMovableColumns={true}
                            floatingFilter={true}
                            pagination={true}
                            paginationAutoPageSize={true}
                            rowHeight={40}
                            rowSelection="multiple"
                            headerHeight={40}
                            floatingFiltersHeight={40}
                            onSelectionChanged={(params) => onSelectionChange(params)}
                            onGridReady={(params) => {
                                setGridApi(params.api)
                                params.api.sizeColumnsToFit()
                            }}
                            onGridSizeChanged={(params) => {
                                params.api.sizeColumnsToFit()
                            }}
                            frameworkComponents={{
                                checkBoxCellRender: CheckBoxCellRender,
                            }}
                        />
                    </div>
                </Paper>
            </div>
        </Fragment>
    )
}

export default TeamListing