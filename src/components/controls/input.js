import { TextField } from '@material-ui/core'
import React from 'react'

export default function Input(props) {
    const { label, name, value, error=null, onChange, ...other } = props
    return (
        <TextField  
                name={name}
                label={label}
                value={value}
                variant="outlined" 
                onChange={onChange}
                {...other}
                {...(error && {error:true, helperText: error})}
            />
    )
}
