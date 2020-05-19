import React from "react";

import { Router, Route, Switch, withRouter } from "react-router";
import { createBrowserHistory } from "history";

import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import rootEpic from './epics';
import rootReducer from './reducers';

import Chat from "./components/chat/chat";
import Rooms from "./components/rooms/rooms";
import Login from "./components/login/login";
import AuthenticatedRoute from "./AuthenticatedRoute";
const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware()
const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
)

epicMiddleware.run(rootEpic)


const useStyles = makeStyles(theme => ({
  margin: {
      margin: theme.spacing() * 2,
  },
  appWrap:{
    backgroundColor: '#151515',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
      padding: theme.spacing(),
      maxWidth: '95%',
      margin: '0 auto',
      transition: 'width 320ms ease-in-out, height 320ms ease-in-out',
      minHeight:'300px',
          
      '&.thin':{
        width: '400px',
      },

      '&.wide':{
        width: '600px',
      },
  },
  

}));

const PaperWrap = withRouter(({className, location,children})=>{
return <Paper className={`${className} ${location && location.pathname === '/Chat' ? 'wide' : 'thin'}`}>{children}</Paper>
})

export default function App() {
  const classes = useStyles();


  return (
    <Router history={history}>
      <div className={classes.appWrap}>
        <Provider store={store}>
          <PaperWrap className={classes.paper}>
            <Switch>
              <Route exact path="/" component={Login} />
              <AuthenticatedRoute path="/Rooms" component={Rooms} />
              <AuthenticatedRoute path="/Chat" component={Chat} />            
            </Switch>
          </PaperWrap>
        </Provider>
      </div>
    </Router>
  );
}
