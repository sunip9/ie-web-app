import React,{useState,useEffect} from 'react'
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api';
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
import ProductForm from './ProductForm'

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
    {id:'buyer', label: "Buyer"}, 
    {id:'size', label: "Size"}, {id:'gsm', label: "GSM"},
    {id: 'item', label: "Item"},{id: 'target', label: "Target"},
    {id:'action', label: "Action", disableSorting: true}
]

export default function Products() {
    const classes = useStyles();
    const [products, setProducts] =useState()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(products, headcells, filterFn)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const init = () =>{    
        getProducts().then(data => {      
          setProducts(data)
        })
      }    
 
             
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.buyer.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = async (product, resetForm) =>{
        if (product._id == null)
         await addProduct(product).then(date => {
            console.log(date)
         })
        else
        await updateProduct(product, product._id).then(date => {
            console.log(date)
        })
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        init()       
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = async(id) =>{
        await deleteProduct(id)        
        setConfirmDialog({...confirmDialog, isOpen:false})
        await init()
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
console.log(products)

    useEffect(()=>{
        init()
    }, [])
    return (
        <>
            <PageHeader 
                title="All Products"
                subtitle="All Products Details Info"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />

            <Toolbar>
                    <Controls.Input
                        label="Search Products"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                     <Controls.Button
                        text="Add Product"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null) }}
                    />
            </Toolbar>  

             <TblContainer>
              <TblHead />
              <TableBody>
            { recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (
                <TableRow >
                    <TableCell>{item.buyer}</TableCell>
              
                    <TableCell component={Link} to={`/product/${item._id}`} style={{cursor: 'pointer', color:'#a250f5', fontSize: '16px'}}
                    >{item.size}</TableCell>
                    <TableCell>{item.gsm}</TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>120</TableCell>
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
                                    title: `Are you sure to delete worker ID: ${item.buyer} ?`,
                                    subTitle: "You can't undo this operation !",
                                    onConfirm: () => { onDelete(item._id) }
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

            <Popup
                title="Product Add Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ProductForm addOrEdit={addOrEdit} recordForEdit={recordForEdit}/>                
                        
            </Popup>
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
