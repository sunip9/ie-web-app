import { Grid} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useForm, Form  } from './useForm'
import { Controls }  from './controls/Controls'
import MuiPaper from './usePaper';
import CloseIcon from '@material-ui/icons/Close';

const initialValues = {
    buyer: '', item: '', gsm: '', type:'',style: '',pro:[]
}

const type = [
    { id: 'ribbon long hem', title: 'Ribbon Long Hem'}, { id: 'ribbon short cutting', title: 'Ribbon Short Cutting'}, 
    { id: 'stitching short hem', title: 'Stitching Short Hem'}, { id: 'folding', title: 'Folding'}
]

export default function ProductForm(props) {
    const { addOrEdit, recordForEdit } = props

    const [smv, setSmv] = useState()
    const [target, setTarget] = useState()
    const [types, setTypes] = useState()
    const [processes, setProcess] = useState([])
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const validate =(fieldValues = values) => {
        let temp={...errors}
        if('buyer' in fieldValues)
        temp.buyer = fieldValues.buyer ? "" : "Name is required !!"
        if('size' in fieldValues)
        temp.size = fieldValues.size ? "" : "Worker ID is required !!"
        if('gsm' in fieldValues)
        temp.gsm = fieldValues.gsm ? "" : "Salary is required !!"
        // if('shift' in fieldValues)
        // temp.shift = fieldValues.shift.length != 0 ? "" : "Shift is required !!"
        setErrors({
            ...temp
        })
        if(fieldValues == values)
        return Object.values(temp).every(x => x== "")
    }
    const {values, setValues,errors, setErrors,handleChange, resetForm} = useForm(initialValues, true, validate)

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate())
        addOrEdit(values, resetForm)      
    }

    useEffect(()=>{
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const addProcess = () =>{
        const oneProcess = {type:values.type, smv: parseFloat(smv), target}  

        values.pro ? setValues({...values, pro:[...values.pro,oneProcess]}) : setValues({...values})
        setSmv('')
        setTarget('')        
    }
    const addValues = () =>{
        setValues({...values, pro:[processes]})
    }
    const onDelete = (i) =>{
        console.log('deleted',i)
        processes.splice(i,1)
        setNotify({
            isOpen: true,
            message: 'Deleted !!',
            type: 'error'
        })
    }
    console.log(processes, 'process')
    console.log(values,'values')
    return (
        <>
        <MuiPaper>
        <Form onSubmit={handleSubmit} >
            <Grid container>
            <Grid item xs={6}>
                <Controls.Input 
                    name='buyer'
                    label="Buyer Name"
                    variant="outlined"
                    value={values.buyer} 
                    onChange={handleChange}
                    error={errors.buyer}
                />

                <Controls.Input 
                    name='size'
                    label="Size"
                    variant="outlined"
                    value={values.size} 
                    onChange={handleChange}
                    error={errors.size}

                />
            
                <Controls.Input 
                    name='gsm'
                    type='number'
                    label="GSM"
                    variant="outlined"
                    value={values.gsm}
                    onChange={handleChange}
                />
                <Controls.Input 

                    name='item'
                    label="Item"
                    variant="outlined"
                    value={values.item}
                    onChange={handleChange}
                    error={errors.item}

                />
                <Controls.Input 

                    name='style'
                    label="Style"
                    variant="outlined"
                    value={values.style}
                    onChange={handleChange}
                    // error={errors.item}

                    />
            </Grid>
            <Grid item xs={6}>
                <Controls.Select
                    name='type'
                    label="Type"
                    variant='outlined'
                    value={values.type}
                    onChange={handleChange}
                    options={type}
                    // error={errors.shift}

                />
                <Controls.Input 
                    name='smv'
                    label="SMV"
                    variant="outlined"
                    value={smv}
                    onChange={(e)=> setSmv(e.target.value)}
                    // error={errors.item}
                />
                 <Controls.Input 
                    name='target'
                    label="Target"
                    variant="outlined"
                    value={target}
                    onChange={(e)=> setTarget(e.target.value)}
                    // error={errors.item}
                />    
                {/* <Controls.DatePicker
                    name='joining'
                    label="Joining Date"
                    value={values.joining}
                    onChange={handleChange}
                /> */}

                <Controls.Button
                        text='Add Another Type'
                        onClick={addProcess}
                /> 

                {values.pro ?
                        <table style={{width:'100%'}}>
                        <tr>
                            <th>SL</th>
                            <th>Type</th>
                            <th>SMV</th>
                            <th>Target</th>
                            <th>Actions</th>
                        </tr>
                        {values.pro.map((x,i) => 
                        
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{x.type}</td>
                            <td>{x.smv}</td>
                            <td>{x.target}</td>
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
                        text='Submit'
                        onClick={addValues}
                        /> 
                    <Controls.Button
                        type='submit'
                        text='Upload'
                        />    
                    <Controls.Button
                        color='default'
                        text='Reset'
                        onClick={resetForm}
                        />     
                </div>     
        </Form>
        </MuiPaper>
        </>
    )
}
