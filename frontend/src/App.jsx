import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import Constants from 'Constants';
import PrivateRoute from 'components/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Landing from './pages/landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';

require('dotenv').config(); // allows us to inject environment variables

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        {/* Private Routes */}
        {/* <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute> */}
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard/experiments">
          <Dashboard section={Constants.dashboard.sections.EXPERIMENTS} />
        </Route>
        <Route exact path="/dashboard/variants">
          <Dashboard section={Constants.dashboard.sections.VARIANTS} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
