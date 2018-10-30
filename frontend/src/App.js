import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import jwt_decode from 'jwt-decode';

// import component
import NavBar from '../src/components/layout/NavBar';
import Login from './components/authentication/Login';
import PrivateRoute from './common/PrivateRoute';

// Redux stuff
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authAction';
import DisplayPatients from './components/patients/DisplayPatients';

//Check for token
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      
      <BrowserRouter>
        <div className="App">
        <NavBar />
        <div>
        <Route exact path="/login" component={Login} />
        <Switch>
              <PrivateRoute exact path="/patients" component={DisplayPatients} />
        </Switch>
        </div>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
