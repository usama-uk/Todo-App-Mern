import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = './login';
  };
};

class App extends React.Component {
  render() {

    // const Home = () => {
    //   return (
    //     <div>
    //       <a href='http://localhost:3001/login/google'>Login with Google</a>
    //     </div>
    //   );
    // };

    // const ToDo = () => {
    //   return (<Dashboard />);
    // };


    return (
      <Provider store={store}>
        <Router>
          <div className='App' >

            <Navbar />
            <Route
              exact path='/'
              component={Landing}
            />
            <Route
              exact path='/register'
              component={Register}
            />
            <Route
              exact path='/login'
              component={Login}
            />
            <Switch>
              <PrivateRoute
                exact path='/dashboard'
                component={Dashboard}
              />
            </Switch>

            {/* <Router>
          <Switch>
            <Route
              exact={true}
              path={'/'}
              component={Home}
            />
            <Route
              exact={true}
              path={'/todo'}
              component={ToDo}
            />
            <Route
              render={() =>
                <h1>Error 404: Not Found</h1>
              }
            />
          </Switch>
        </Router> */}
          </div>
        </Router>
      </Provider>
    );
  };
};

export default App;