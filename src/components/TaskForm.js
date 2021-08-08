
import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useForm, Form  } from './useForm'
import { Controls }  from './controls/Controls'
import MuiPaper from './usePaper';
import { addTask, getProducts, getWorkers } from '../api';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect, Grid, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import Notification from './Notification';
import Popup from './controls/Popup';
import CloseIcon from '@material-ui/icons/Close';
import PageHeader from './Header/PageHeader'
import EventNoteIcon from '@material-ui/icons/EventNote';
import SaveIcon from '@material-ui/icons/Save';

const initialValues = {
    worker: '', product:'', floor: '', line: '', time: 0, 
    date: new Date(Date.now() - 86400000) 
}

const line = [
    { id: 1, title: 1}, { id: 2, title: 2}, { id: 3, title: 3},{ id: 4, title: 4},{ id: 5, title: 5},{ id: 6, title: 6},{ id: 7, title: 7}
]
const floor = [
    { id: 1, title: 1}, { id: 2, title: 2}, { id: 3, title: 3},{ id: 4, title: 4},{ id: 5, title: 5}
]
export default function TaskForm(props) {
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [workers, setWorkers] = useState()
    // const workers = useSelector(state => state.workers)
    const [products, setProducts ] = useState()
    const [product, setProduct ] = useState()
    const [productId, setProductId]=useState('') 
    const [task, setTask] = useState() 
    const [task2, setTask2] = useState() 
    const [tasks, setTasks]= useState()
    const [efficiency, setEfficiency] = useState()
    const [target, setTarget]=useState()
    const [time, setTime]=useState()
    const [achieve, setAchieve]=useState()
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    
    const validate =(fieldValues = values) => {
        let temp={...errors}
        if('worker' in fieldValues)
        temp.worker = fieldValues.worker ? "" : "Worker is required !!"
        if('product' in fieldValues)
        temp.product = fieldValues.product ? "" : "Product ID is required !!"
        if('time' in fieldValues)
        temp.time = fieldValues.time.length > 0 ? "" : "Time is required !!"
        if('achieve' in fieldValues)
        temp.achieve = fieldValues.achieve ? "" : "Achieve amount is required !!"
        if('floor' in fieldValues)
        temp.floor = fieldValues.floor ? "" : "Floor is required !!"
        
        setErrors({
            ...temp
        })
        if(fieldValues == values)
        return Object.values(temp).every(x => x== "")
    }
    const {values, setValues, errors, setErrors, handleChange, resetForm} = useForm(initialValues, true, validate)

    let error= null
    const init = () =>{    
        getWorkers().then(data => {      
          setWorkers(data)
        })
        getProducts().then(data => {      
            setProducts(data)
          })
      }  
    const addProduct = () =>{        
        const selectProduct = products && products.filter(x => x._id == productId)
        setProduct(selectProduct ? selectProduct[0]: '')        
      }
    const productSelect = (e) =>{
        setProductId(e.target.value) 
    } 

    // console.log(productId,'productId')
    // console.log(product,"product")

    const addTasks = () =>{ 
        let x = ((achieve*(60/target))/(60*time))
        let oneTask = { size: product.size, achieve, time, target:target*time, efficiency: x}
        console.log(oneTask)
        let effTask = { product: productId, efficiency: x }
        task2 ? 
        setTask2([...task2, effTask])    
        : setTask2([effTask]) 
        task ? 
        setTask([...task, oneTask])    
        : setTask([oneTask]) 
        setTarget('')
        setValues({...values, product: ''})
        setAchieve('')
        setTime('') 
        setOpenPopup(false) 
      }
      console.log(values, 'values')
      console.log(task,"task")
    const fullTask = () =>{
        const gg = task2.map(x => x.efficiency).reduce((prev,next) => prev + next)
        let avg = gg/task2.length
               
        setTasks({ date: values.date, worker: values.worker, floor: values.floor, line: values.line, task, avg })
        setEfficiency({ date: values.date, worker: values.worker, floor: values.floor, task2, avg}) 
        // setTimeout(() => { 
        //     console.log('hitting ...')  
        //     clickSubmit() 
        //     console.log('hitting ...')
        // },3000)
        // clickSubmit()
         }  

      const clickSubmit = async() => {
        if (tasks)        
        await addTask(tasks).then(data =>{
          console.log(data,'data')
          setNotify({
            isOpen: true,
            message: 'Successfully Updated !!',
            type: 'success'
        })
        })
        else 
        console.log('No data')
        setTask('')
        setEfficiency('')
        
      };
   

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate())
        // fullTask()
        console.log('submitted')        
    }
    console.log(tasks,'tasks')
    console.log(time)

    const onDelete = (i) =>{
        console.log('deleted',i)
        task.splice(i,1)
        setNotify({
            isOpen: true,
            message: 'Deleted !!',
            type: 'error'
        })
    }
    useEffect(()=>{
        init()
    }, [task, tasks])

    return (
        <>
        <PageHeader 
                title="Add Daily Tasks"
                subtitle="Date Basis Assign Work"
                icon={<EventNoteIcon fontSize="large" />}
            />
        <MuiPaper>
        <Form 
        onSubmit={handleSubmit}
        >
            <Grid container>
            <Grid item xs={6}>
                <Controls.DatePicker
                    name='date'
                    label="Date"
                    value={values.date}
                    onChange={handleChange}
                />

                <Controls.Select
                    name='floor'
                    label="Floor"
                    variant='outlined'
                    value={values.floor}
                    onChange={handleChange}
                    options={floor}
                    error={errors.floor}
                /> 

                <Controls.Select
                    name='line'
                    label="Line"
                    variant='outlined'
                    value={values.line}
                    onChange={handleChange}
                    options={line}
                    error={errors.line}
                /> 
                </Grid>
                <Grid item xs={6}> 
 
                <Controls.Select
                    name='worker'
                    label="Worker"
                    variant='outlined'
                    value={values.worker}
                    onChange={handleChange}
                    options={workers}
                    error={errors.worker}

                />
                 <FormControl variant='outlined'
                    {...(error && {error:true})}>
                    <InputLabel>Product</InputLabel>
                    <MuiSelect
                        label='Product'
                        name='product'
                        value={values.product}                       
                        onClick={productSelect}
                        onChange={handleChange}
                        // error={errors.product} 
                        // onClick={values.product.length >0 ? productSelect : alertNotice}
                        >
                        <MenuItem value="">None</MenuItem> 
                        { products && products.map( item => (<MenuItem key={item._id} value={item._id} >{item.buyer} || {item.size} || {item.gsm}</MenuItem> ))}       
                    </MuiSelect> 
                    {/* { errors.product && <FormHelperText style={{color:'red'}}>{errors.product}</FormHelperText> } */}
                </FormControl> <br/>
                <Controls.Button
                        text="Task"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        // className={classes.newButton}
                        onClick={() => { setOpenPopup(true); addProduct()}}
                    />  <br/>
                    {task ?
                        <table style={{width:'100%'}}>
                        <tr>
                            <th>SL</th>
                            <th>Size</th>
                            <th>Achieve</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                        {task.map((x,i) => 
                        
                        <tr>
                            <td>{i+1}</td>
                            <td>{x.size}</td>
                            <td>{x.achieve}</td>
                            <td>{x.time}</td>
                            <td>
                            <Controls.ActionButton
                            color="secondary"
                            onClick={() => onDelete(i)}
                            >
                            <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                            </td>
                        </tr>
                        )}
                        
                        </table>
                        
                        : 
                        ''}

               
           </Grid>
          
            
            </Grid>
            <div style={{margin: ' 20px 0 20px 10px', paddingLeft: '5px'}}>
                    <Controls.Button
                        type='submit'
                        text='Submit'
                        onClick={fullTask}
                        /> 
                     <Controls.Button
                        text='Save Data'
                        color='info'
                        startIcon={<SaveIcon />}
                        onClick={clickSubmit}
                        />     
    
                    <Controls.Button
                        color='default'
                        text='Reset'
                        onClick={() => { resetForm(); setTask('') }}
                        />     
                </div> 



                <Popup
                    title="Task assign fields"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    >
                <>
                <Form>
                <Grid item xs={6}>
                <FormControl variant='outlined'
                    {...(error && {error:true})}>
                    <InputLabel>Process</InputLabel>
                    { product ?
                    <MuiSelect
                        label='Process'
                        name='process'
                        value={values.target}
                        // onChange={handleChange}
                        // error={errors.process}
                        onChange={(e) =>setTarget(e.target.value)}
                        >
                      
                        <MenuItem value="">None</MenuItem> 
                        {product.pro.map( x => 
                            <MenuItem  value={x.target}>{x.type}</MenuItem>
                        )}

                         {/* <MenuItem  value={product.process[0].ribbon[0].target}>{product.process[0].ribbon[0].type}</MenuItem>
                         <MenuItem  value={product.process[0].ribbon[1].target}>Ribbon short cutting</MenuItem>
                         <MenuItem  value={product.process[1].stitching[0].target}>Stitching short hem</MenuItem>                                                        */}
                    </MuiSelect> 
                    : ""
                     } 
                    { errors.process && <FormHelperText style={{color:'red'}}>{errors.process}</FormHelperText> }
                </FormControl>  <br/>
                 <Controls.Input 
                    name='time'
                    type='number'
                    label="Working Time"
                    variant="outlined"
                    value={time}
                    onChange={(e) => setTime(parseInt(e.target.value))}
                    // error={errors.time}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />  
                {/* <input
                    label="Time"
                    // name='time'
                    variant='outlined'
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    /> */}
                 <Controls.Input 
                    type="number"
                    name='achieve'
                    label="Achieve"
                    variant="outlined"
                    value={achieve}
                    // onChange={handleChange}
                    onChange={(e) => setAchieve(parseInt(e.target.value))}
                    // error={errors.achieve}

                /> 
                <Controls.Button
                        text="Add Task"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        // className={classes.newButton}
                        onClick={addTasks}
                    />

                   </Grid> 
                   </Form>
            </>             
                        
        </Popup>
        

        </Form>
        <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </MuiPaper>
        </>
    )
}
