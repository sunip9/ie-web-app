import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  root:{
    backgroundColor: '#fdfdff'
  },
    pageContent:{
      margin: theme.spacing(7),
      padding: theme.spacing(5)
    },
  
  }))

export default function MuiPaper(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {props.children}
        </div>
      
    )
}