import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import format from 'date-fns/format'

import { AgGridReact } from 'ag-grid-react'

import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import LinearProgress from '@material-ui/core/LinearProgress'

import { tokensQuery } from 'ROOT/services/graphql/tokens.graphql'
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
        headerName: t('listing.column.id'),
        field: '_id',
        width: 130,
    },
    {
        headerName: t('listing.column.expiredAt'),
        field: 'expiredAt',
        valueFormatter: function (params) {
            return format(new Date(params.value),tGlobal('date.format1'))
        },
        width: 130,
    },
    {
        headerName: t('listing.column.type'),
        field: 'type',
        width: 130,
    },
]

const TokenListing = () => {

    const classes = useStyles()
    const { data:dataTokens, loading: loadingTokens, error:errorTokens } = useQuery(tokensQuery)
    const { t } = useTranslation('tokens')
    const { t:tGlobal } = useTranslation('global')

    return (
        <Fragment>
            {loadingTokens ? <LinearProgress /> : <div style={{ height: '4px' }}></div>}
            <div className={classes.content}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to={routes.PRIVATE_DASHBOARD}>
                        MyApp
                    </Link>
                    <Link color="inherit" to={routes.PRIVATE_TOKENS}>
                        Tokens
                    </Link>
                </Breadcrumbs>
                <Paper className={classes.tablePaper}>
                    <div id="myGrid"
                        className="ag-theme-material"
                        style={{
                            height: '553px', width: '100%', padding: 8 * 3,
                        }}
                    >
                        <AgGridReact
                            columnDefs={columnDefs(t,tGlobal)}
                            defaultColDef={defaultColDef}
                            columnTypes={columnTypes}
                            rowData={errorTokens || loadingTokens ? null : dataTokens.tokens}
                            suppressCellSelection={true}
                            suppressRowClickSelection={true}
                            suppressMovableColumns={true}
                            floatingFilter={true}
                            pagination={true}
                            paginationAutoPageSize={true}
                            rowHeight={40}
                            rowSelection="single"
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

export default TokenListing