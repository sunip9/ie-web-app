import { Grid, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Form } from './useForm'
import { Controls }  from './controls/Controls'
import PageHeader from '../components/Header/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import MuiPaper from './usePaper';
import { getWorker, updateWorker } from '../api';

const initialValues = {
    empId: '', name:'', designation: '', salary: '', section: '', 
    skill: [], exp: 0, shift: '', status: '', joining: new Date() 
}

const statusItem = [
    {id: 'active', title: 'Active'} , { id: 'inactive', title: 'In Active'}
]

const shiftTime = [
    { id: 'a', title: 'A'}, { id: 'b', title: 'B'}, { id: 'c', title: 'C'}
]

export default function UpdateWorker(props) {
    const [value, setValue] =useState(initialValues)
    const [errors, setErrors] =useState({})
    const { addOrEdit, notifyCall } = props

    let validateOnChange = true
    const validate =(fieldValues = values) => {
        let temp={...errors}
        if('name' in fieldValues)
        temp.name = fieldValues.name ? "" : "Name is required !!"
        if('empId' in fieldValues)
        temp.empId = fieldValues.empId ? "" : "Employee ID is required !!"
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

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if(validateOnChange)
        validate({ [name]: value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate())
        clickSubmit()        
        
    }
    const resetForm = e => {
        setValues(initialValues)
        setErrors({})
    }
    const clickSubmit = async() => {
        await updateWorker(value,id).then(date => {
          console.log(date)
        })
        addOrEdit()
        notifyCall()
    }
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
                    label="Employee ID"
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
            </Grid>
            <Grid item xs={6}>
                <Controls.RadioGroup 
                    name='status'
                    label= 'Status'
                    variant='outlined'
                    value={values.status}
                    onChange={handleChange}
                    items={statusItem}
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
                <Controls.DatePicker
                    name='joining'
                    label="Joining Date"
                    value={values.joining}
                    onChange={handleChange}
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
