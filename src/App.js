import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Nav from './Components/Nav/Nav'
import UserCredentialsContext from './Components/UserCredentialsContext/UserCredentialsContext';
import About from './Pages/About/About'
import Donate from './Pages/Donate/Donate'
import MapContainer from './Pages/Map/Map2';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <UserCredentialsContext>
            <Nav/>
            <MapContainer/>
          </UserCredentialsContext>
        </Route>
        <Route path='/Donate'>
          <UserCredentialsContext>
            <Nav/>
            <Donate/>
          </UserCredentialsContext>
        </Route>
        <Route path='/About'>
          <UserCredentialsContext>
            <Nav/>
            <About/>
          </UserCredentialsContext>
        </Route>
        <Route exact path="/Map">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
