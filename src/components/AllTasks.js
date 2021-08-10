import React,{useState,useEffect} from 'react'
import { getTasks } from '../api';
import { makeStyles, Toolbar } from '@material-ui/core'
import {Link} from 'react-router-dom'
import PageHeader from './Header/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import useTable from './useTable';
import { InputAdornment, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Controls }  from './controls/Controls'
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from './controls/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from './Notification';
import ConfirmDialog from "./ConfirmDialog";
import moment from 'moment'


const useStyles = makeStyles(theme => ({
   searchInput: {
        width: '35%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))
const headcells =[
    {id:'date', label: "Date"}, {id:'floor', label: "Floor", type: "number"}, 
    {id:'line', label: "Line"}, {id:'task', label: "Number of Product"},{id:'time', label: "Total Time"},
    {id: 'avg', label: "Efficiency"}, {id:'action', label: "Action", disableSorting: true}
]

export default function Workers() {
    const classes = useStyles();
    const [tasks, setTasks] =useState()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(tasks, headcells, filterFn)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const init = () =>{    
        getTasks().then(data => {      
          setTasks(data)
        })
      }    
 
    console.log(tasks)
       
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.floor.toLowerCase().includes(target.value))
            }
        })
    }
    // const addOrEdit = async (worker, resetForm) =>{
    //     if (worker._id == null)
    //      await addWorker(worker).then(date => {
    //         console.log(date)
    //      })
    //     else
    //     await updateWorker(worker, worker._id).then(date => {
    //         console.log(date)
    //     })
    //     resetForm()
    //     setRecordForEdit(null)
    //     setOpenPopup(false)
    //     init()       
    //     setNotify({
    //         isOpen: true,
    //         message: 'Submitted Successfully',
    //         type: 'success'
    //     })
    // }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    // const onDelete = async(id) =>{
    //     await deleteWorker(id)        
    //     setConfirmDialog({...confirmDialog, isOpen:false})
    //     await init()
    //     setNotify({
    //         isOpen: true,
    //         message: 'Deleted Successfully',
    //         type: 'error'
    //     })
    // }
    useEffect(()=>{
        init()
    }, [])
    
    return (
        <>
            <PageHeader 
                title="All Workers"
                subtitle="All workers all info"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Toolbar>
                    <Controls.Input
                        label="Search Workers"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    
            </Toolbar>            
            <TblContainer>
              <TblHead />
              <TableBody>
            { recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (
                <TableRow >
                    <TableCell>{moment(item.date).format('MMMM Do YYYY')}</TableCell>
                    <TableCell>{item.floor}</TableCell>
                    <TableCell>{item.line}</TableCell>
                    <TableCell>{item.task.length}</TableCell>
                    <TableCell>{item.totalTime}</TableCell>
                    <TableCell>{item.avgEff} %</TableCell>

                    <TableCell>
                        <Controls.ActionButton
                            color="primary"
                            onClick={() => { openInPopup(item) }}
                            >
                            <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>

                        <Controls.ActionButton
                            color="secondary"
                            onClick={() => {
                                setConfirmDialog({
                                    isOpen: true,
                                    title: `Are you sure to delete worker ID: ${item.empId} ?`,
                                    subTitle: "You can't undo this operation !",
                                    // onConfirm: () => { onDelete(item._id) }
                                })
                            }}
                            >
                            <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                    </TableCell>

                </TableRow>
            ))}
            </TableBody>
            
            </TblContainer>
            <TblPagination />

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
             <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
