import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from '../HomePage/HomePage'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Dashboard from '../Dashboard/Dashboard'

import firebase from '../firebase'

import './App.css';


const theme = createMuiTheme()


function App() {

  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

  useEffect(() => {
    firebase.isInitialized()
      .then(val => {
        setFirebaseInitialized(val)
      })
  })


  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id='loader'>
      <CircularProgress />
    </div>
  ) 
}

export default App;
