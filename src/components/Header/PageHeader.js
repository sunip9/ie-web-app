import React from 'react'
import { Paper, Card, Typography, makeStyles } from '@material-ui/core'



const useStyles = makeStyles(theme =>({
    root:{
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(2)
    },
    pageIcon:{
        display: 'inline-block',
        marginRight: theme.spacing(5),
        padding: theme.spacing(2),
        color:'#3c44b1'
    },
    pageTitle:{
        paddingLeft: theme.spacing(6),
        '& .MuiTypography-subtitle2':{
            opacity: '0.6'
        }
    }
}))
export default function PageHeader(props) {
    const { icon, title, subtitle } = props
    const classes = useStyles()
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div>
                    <Typography 
                    variant="h4"
                    component="div">
                        {title}
                    </Typography>
                    <Typography 
                    variant="subtitle1"
                    component="div">
                        {subtitle}
                    </Typography>

                </div>
            </div>

        </Paper>
    )
}
