import React from 'react';
import './style.css';
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import PowerSettingNewIcon from '@material-ui/icons/PowerSettingsNew'
import { makeStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'


const useStyles = makeStyles(theme =>({
    root: {
        backgroundColor: '#fff',
        transform: 'translateZ(0)'
    },
    searchInput: {
        opacity: '0.6',
        padding: '0px 8px',
        fontSize: '1.2rem',
        '&:hover':{
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root':{
            marginRight: '8px'
        }
    }
}))
const Header = ()=> {
    const classes = useStyles()
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                        <InputBase
                        className={classes.searchInput} 
                        placeholder="Search here .. "
                        startAdornment= { <SearchIcon fontSize="small"/>}
                        />
                    </Grid>
                    <Grid item sm>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color="secondary" ontSize="small">
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge color="secondary" ontSize="small">
                                <PowerSettingNewIcon />
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
            
        </AppBar>
    )
}


export default Header;




// <nav className="navbar navbar-expand-lg navbar-bar">
//                 <Link to='/' className="navbar-brand" >IE Web App</Link>                
//                 <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                     <div className="navbar-nav pl-2">                        
//                         <Link to='/' className="nav-item nav-link active">Home</Link>
//                         <Link to='/task' className="nav-item nav-link active">Task</Link>
//                         <Link to='/po' className="nav-item nav-link active">PO</Link>
//                         <Link to='/worker'className="nav-item nav-link" >Worker</Link> 
//                         <Link to='/download'className="nav-item nav-link" >Reports</Link>                    
//                     </div>
//                 </div>                    
//                 <button className="btn btn-sm btn-info btn-login"><Link style={{color:'white'}} >Logout</Link></button>
//             </nav>