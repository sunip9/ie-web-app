import { Grid, Checkbox} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useForm, Form  } from './useForm'
import { Controls }  from './controls/Controls'
import MuiPaper from './usePaper';

const initialValues = {
    empId: '', name:'', designation: '', salary: '', section: '', address:'', 
    skill: [], exp: 0, shift: '',age: '', floor: '', marital: '', status: '', joining: new Date() 
}

const statusItem = [
    {id: 'active', title: 'Active'} , { id: 'inactive', title: 'In Active'}
]
const maritalItem = [
    {id: 'married', title: 'Married'} , { id: 'unmerried', title: 'Un Merried'}
]

const shiftTime = [
    { id: 'a', title: 'A'}, { id: 'b', title: 'B'}, { id: 'c', title: 'C'}
]

export default function WorkerForm(props) {

    const { addOrEdit, recordForEdit } = props
    const [getSkill, setGetSkill] = useState([])

    const validate =(fieldValues = values) => {
        let temp={...errors}
        if('name' in fieldValues)
        temp.name = fieldValues.name ? "" : "Name is required !!"
        if('empId' in fieldValues)
        temp.empId = fieldValues.empId ? "" : "Worker ID is required !!"
        if('salary' in fieldValues)
        temp.salary = fieldValues.salary ? "" : "Salary is required !!"
        if('shift' in fieldValues)
        temp.shift = fieldValues.shift.length != 0 ? "" : "Shift is required !!"
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
    const getSkill2 = (e) =>{
        let data = getSkill;
        data.push(e.target.value)
        setGetSkill(data)
    }
    useEffect(()=>{
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
    return (
        <>
        <MuiPaper>
        <Form onSubmit={handleSubmit} >
            <Grid container>
            <Grid item xs={6}>
                <Controls.Input 
                    name='name'
                    label="Name"
                    variant="outlined"
                    value={values.name} 
                    onChange={handleChange}
                    error={errors.name}
                />

                <Controls.Input 
                    name='empId'
                    type='number'
                    label="Worker ID"
                    variant="outlined"
                    value={values.empId} 
                    onChange={handleChange}
                    error={errors.empId}

                />
            
                <Controls.Input 
                    name='designation'
                    label="Designaation"
                    variant="outlined"
                    value={values.designation}
                    onChange={handleChange}
                />
                <Controls.Input 
                    type='number'
                    name='salary'
                    label="Salary"
                    variant="outlined"
                    value={values.salary}
                    onChange={handleChange}
                    error={errors.salary}
                />
                  <Controls.Input 
                    name='age'
                    label="Age"
                    variant="outlined"
                    value={values.age}
                    onChange={handleChange}
                />
                 <Controls.Input 
                    name='section'
                    label="Section"
                    variant="outlined"
                    value={values.section}
                    onChange={handleChange}
                    // error={errors.salary}
                />
                 <Controls.Input 
                    name='address'
                    label="Address"
                    variant="outlined"
                    value={values.address}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <Controls.DatePicker
                    name='joining'
                    label="Joining Date"
                    value={values.joining}
                    onChange={handleChange}
                />
                <Controls.Input 
                    name='contact'
                    label="Contact No"
                    variant="outlined"
                    value={values.contact}
                    onChange={handleChange}
                    // error={errors.salary}
                />
                <Controls.Select
                    name='shift'
                    label="Shift"
                    variant='outlined'
                    value={values.shift}
                    onChange={handleChange}
                    options={shiftTime}
                    error={errors.shift}
                />
 
                <Controls.RadioGroup 
                    name='status'
                    label= 'Status'
                    variant='outlined'
                    value={values.status}
                    onChange={handleChange}
                    items={statusItem}
                />
                <Controls.RadioGroup 
                    name='marital'
                    label= 'Marital Status'
                    variant='outlined'
                    value={values.marital}
                    onChange={handleChange}
                    items={maritalItem}
                />
               
               <Controls.Checkbox
                    // name="stitching"
                    label="Stitching"
                    // value="stitching"
                    // onChange={(e) =>getSkill2(e)}
                />
               
                
            </Grid>
            </Grid>
            <div style={{margin: ' 20px 0 20px 10px', paddingLeft: '5px'}}>
                    <Controls.Button
                        type='submit'
                        text='Submit'
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
