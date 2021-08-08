import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core'
import React from 'react'

export default function Select(props) {
    const { name, label, value, error=null, onChange, options } = props
    return (
        <FormControl variant='outlined'
            {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem> 
                { options && options.map( item => (<MenuItem key={item._id || item.id} value={item._id || item.id} >{item.title} {item.empId} {item.buyer}  {item.size}</MenuItem> ))}       
            </MuiSelect> 
            { error && <FormHelperText>{error}</FormHelperText> }

        </FormControl>

    )
}
