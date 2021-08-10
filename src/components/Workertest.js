import 'date-fns';
import React,{useState, useEffect} from 'react'
import moment from 'moment'
import { getProducts, addTask, getWorkers, addEfficiency } from '../api';
import { GridColumnsPanel } from '@material-ui/data-grid';
import { Grid, Paper, makeStyles, TextField } from '@material-ui/core';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import PageHeader from './Header/PageHeader'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Form } from './useForm'
import MuiPaper from './usePaper'


// const useStyles = makeStyles(theme => ({
//   pageContent:{
//     margin: theme.spacing(7),
//     padding: theme.spacing(5)
//   },

// }))

export default function Worker() {
  // const classes = useStyles()
  const [achieve, setAchieve]=useState()
  const [productId, setProductId]=useState('')  
  const [product, setProduct]=useState('')  
  const [time, setTime]=useState()
  const [target, setTarget]=useState()
  const [efficiency, setEfficiency] = useState()
  const [item, setItem] =useState()
  

  const [task, setTask] = useState()
  const [task2, setTask2] = useState()
  const [tasks, setTasks]= useState()
  
  const [worker, setWorker] = useState()
  const [date,setDate]= useState(new Date());
  const [workers, setWorkers] = useState()
  const [products, setProducts] = useState()
  const [floor, setFloor]=useState()
  const [line, setLine]=useState()
  const [ db, setDb] = useState()


const addProduct = () =>{
  const selectProduct = products && products.filter(x => x._id == productId)
  // console.log(selectProduct[0])
  setProduct(selectProduct ? selectProduct[0]: '')
}
  const addTasks = () =>{ 
    let x = ((achieve*(60/target))/(60*time))
    let oneTask = { size: product.size, achieve, time, target:target*time, efficiency: x}
    let effTask = { product: productId, efficiency: x }
    task2 ? 
    setTask2([...task2, effTask])    
    : setTask2([effTask]) 
    task ? 
    setTask([...task, oneTask])    
    : setTask([oneTask]) 

    setAchieve('')
    setTime('')
      
  }

  const fullTask = async() =>{
    const gg = task2.map(x => x.efficiency).reduce((prev,next) => prev + next)
    let avg= gg/task2.length
    console.log(avg)
    // console.log()
    await setTasks({ date, worker, floor, line, task, avg })
    await setEfficiency({ date, worker, floor, task2, avg})    
  }

  const init = () =>{    
    getWorkers().then(data => {      
      setWorkers(data)
    })
    getProducts().then(data => {        
      setProducts(data)
    })
  }
  // console.log(product)
  console.log('efficiency', efficiency)
  // console.log(task)
  console.log('Fulltask',tasks)
  // console.log(worker)
  // console.log(product ? product.process[1].stitching[0].target : '')


  const clickSubmit = async() => {
    await addEfficiency(efficiency).then(date => {
      console.log(date)
    })
    await addTask(tasks).then(data =>{
      console.log(data)
    })

    await setTasks('')
    
  };
  // let yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
  
  useEffect(()=>{
      init()
  }, [task])
console.log('tasks',tasks)
console.log(floor)
const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
       <h4 className="ui dividing header">Add tasks</h4>
<div className="six wide field">
<label>Date : </label>   
<input type='date' name='date' value={date} onChange={(e) =>setDate(e.target.value)}/> <br/>
 <br/>
<label>Worker : </label> 
<select name="worker" id="worker" onChange={(e) =>setWorker(e.target.value)}>
<option value="volvo">Please select..</option>
{workers && workers.map( w => 
  <option value={w._id} key={w._id}>{w.empId}</option>
  
  )}
</select>  <br/>
<label>Product : </label> 
<select name="product" id="product" onChange={(e) =>setProductId(e.target.value)}>
<option value="">Please select..</option>
{products && products.map( w => 
  <option value={w._id} key={w._id} >{w.buyer} || {w.size}</option>
  
  )}
</select> <button onClick={addProduct}>+</button><br/>
<label>Process : </label> 
{ product ? 
<select name="product" id="product" onChange={(e) =>setTarget(e.target.value)}>
<option value="">Please select..</option>
  <option  value={product.process[0].ribbon[0].target} >Ribbon long hem</option>  
  <option value={product.process[0].ribbon[1].target}  >Ribbon short cutting</option> 
  <option value={product.process[1].stitching[0].target}>Stitching short hem</option> 

</select> 
: ''}<br/>
<input type='number' name= 'time' required value={time} placeholder="time"  onChange={(e) =>setTime(e.target.value)}/>
<input type='number' name='achieve' value={achieve} placeholder="achieve" onChange={(e) =>setAchieve(e.target.value)}/>

<input type='text' name='floor'placeholder="floor" value={floor} onChange={(e) =>setFloor(e.target.value)}/>
<input type='text' name='line' placeholder="line" value={line} onChange={(e) =>setLine(e.target.value)}/> <br/>
</div>

      <button onClick={addTasks}>Submit</button>
    <button onClick={fullTask}>FullTask</button>
    <button onClick={clickSubmit}>Add</button>

    
    </>

  )
}
