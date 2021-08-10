import React from "react";
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/Header/index';
import Workers from './components/Workers'
import PageHeader from './components/Header/PageHeader'
import Dashboard from './components/Dashboard';
import Worker from './components/worker/Worker';
import Task from './components/Task';
import TaskForm from "./components/TaskForm";
import Profile from './components/Profile';
import AddWorker from './components/addWorker';
import Products from "./components/Products";
import SideMenu from "./components/SideMenu";
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Home from './components/home/Home'
import AllTasks from './components/AllTasks'

const theme = createMuiTheme({
  palette:{
    primary:{
      main: "#333996",
      light: "#3c44b126"
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526"
    },
    background:{
      default: "#f4f5fd"
    },   
  },
  shape:{
    borderRadius: '0.31rem'
  }
})

const useSyles = makeStyles({
  appMain: {
    paddingLeft: '20rem',
    width: '100%'
  }
})

const Routes = () => {
  const classes = useSyles()
  return (
    <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/worker/:id" exact component={Worker} />
            <Route path="/products" exact component={Products} />
            <Route path="/workers" exact component={Workers} />
            <Route path="/add-worker" exact component={AddWorker} />
            {/* <Route path="/worker/:id" exact component={Task} /> */}
            <Route path="/alltask" exact component={AllTasks} />
            <Route path="/addTask" exact component={TaskForm} />
            {/* <Route path="/worker/:id" exact component={Profile} /> */}

        </Switch>
      </div>   
      <CssBaseline />
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
  );
};

export default Routes;
