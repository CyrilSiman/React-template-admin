import React, {Component} from 'react'
import {Box, Checkbox, FormLabel, Icon, IconButton, Input, InputAdornment, Paper, withStyles} from '@material-ui/core'
import _ from 'lodash'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import style from './styles'
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import BoldStringPart from 'ROOT/components/BoldPartString'

class SelectorUIFilter extends Component {
    constructor(props) {
        super(props)
        let srcElement = props.dataFilter ? props.dataFilter : []

        if(props.dataDiscoverElement) {
            srcElement = []

            props.api.forEachNode((node,index) => {
                const value = this.props.valueGetter(node)
                if(!srcElement.includes(value)) {
                    srcElement.push(value)
                }
            })
        }

        const elements = srcElement.sort((a,b) => a < b ? -1 : 1).reduce((result,value) => {
            return [...result, {label:value, selected: true}]
        },[])

        this.state = {
            elements : elements,
            allSelected : true,
            filterInput : '',
            hidePopupCallback : null
        }

        this.valueGetter = this.props.valueGetter

        this.onChange = this.onChange.bind(this)
        this.toggleAllSelected = this.toggleAllSelected.bind(this)
        this.onChangeToggleElement = this.onChangeToggleElement.bind(this)
        this.cleanSearch = this.cleanSearch.bind(this)
    }

    isFilterActive() {
        //return this.state.text !== null && this.state.text !== undefined && this.state.text !== ''
        //const selectedCount = this.state.elements.filter((value) => value.selected).length
        return !this.state.allSelected && !this.state.elements.every((value) => value.selected)
    }

    doesFilterPass(params) {

        const value = this.valueGetter(params.node).toString().toLowerCase()
        const target = _.find(this.state.elements, function(o) { return o.label.toLowerCase() === value})
        if (target) {
            return target.selected
        }
        return false
    }

    toggleAllSelected() {
        this.setState({
            allSelected : !this.state.allSelected,
            elements : this.state.elements.map((value) => {value.selected = !this.state.allSelected; return value}),
        }, this.props.filterChangedCallback)
    }

    onChange(event) {
        let newValue = event.target.value
        if (this.state.filterInput !== newValue) {
            this.setState({filterInput: newValue})
        }
    }

    cleanSearch(event){
        this.setState({filterInput: ''})
    }

    getModel() {
        let model = null

        if(this.isFilterActive()) {
            let selectedElement = this.state.elements.reduce((result,value) => {
                return value.selected ? [...result,value.label] : result
            },[])
            model = `(${selectedElement.length}) ${selectedElement.join(',')}`
        }
        return {value:model}
    }

    setModel(model) {
        this.setState({
            allSelected: false,
            elements: [{label: 'Activé', selected: true}, {label: 'Gelé', selected: false}]
        })
        this.props.filterChangedCallback()
        console.log(model)
    }

    afterGuiAttached({hidePopup}) {
        this.setState({hidePopupCallback: hidePopup})
    }

    onChangeToggleElement(event) {
        const newElements = [...this.state.elements]
        const target = _.find(newElements, function(o) { return o.label === event.target.value})
        if(target) {
            target.selected = !target.selected
            this.setState({elements:newElements,allSelected:this.state.elements.every((value) => value.selected)}, this.props.filterChangedCallback)
        }
    }

    render() {

        const {classes} = this.props
        const {elements,allSelected,filterInput, hidePopupCallback} = this.state

        const filteredElements = elements.reduce((result,value) => {
            return value.label.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()) ? [...result, value] : result
        },[])

        return (
                <Paper className={classes.paperRoot}>
                <Box className={classes.boxHeader} textAlign='center' onClick={() => hidePopupCallback ? hidePopupCallback() : null}>
                    <Icon className={classes.icon} color='action' fontSize='small'>
                        filter_list
                    </Icon>
                </Box>
                    <FormControl className={classes.inputFormControl} >
                        <Input
                            classes={{input:classes.input}}
                            placeholder='Search...'
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                            value={filterInput}
                            onChange={this.onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton size={'small'} aria-label="Clean search" onClick={this.cleanSearch}>
                                        {filterInput ? <CloseIcon style={{fontSize : '1rem'}}/> : <CloseIcon style={{visibility : 'hidden',fontSize : '1rem'}}/>}
                                    </IconButton>
                                </InputAdornment>}
                        />
                    </FormControl>
                <div className={classes.valueContainer}>
                    <FormLabel>
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                            checked={allSelected}
                            onChange={this.toggleAllSelected}
                            value='all'
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />
                        <Typography variant={'body1'} component={'span'} style={{fontSize:'0.8rem'}}>(Select all)</Typography>
                    </FormLabel>
                </div>
                <Divider className={classes.divider} />
                <div style={{height:'180px'}}>
                    <div className={classes.divViewport}>
                        <div className={classes.valueContainer} style={{height:'180px'}}>
                        {filteredElements.map((value) => {
                            return (
                                <div key={value.label}>
                                    <FormLabel>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                                            checked={value.selected}
                                            onChange={this.onChangeToggleElement}
                                            value={value.label}
                                            inputProps={{
                                                'aria-label': 'primary checkbox',
                                            }}
                                        />
                                        <Typography variant={'body1'} component={'span'} style={{fontSize:'0.8rem'}}>
                                            {filterInput ? <BoldStringPart src={value.label} find={filterInput}/> : value.label}
                                        </Typography>
                                    </FormLabel>
                                </div>)
                        })}
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default withStyles(style)(SelectorUIFilter)
