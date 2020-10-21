import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Nav from './Components/Nav/Nav'
import About from './Pages/About/About'
import Donate from './Pages/Donate/Donate'
import Map from './Pages/Map/Map'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Nav/>
          <Map/>
        </Route>
        <Route path='/Donate'>
          <Nav/>
          <Donate/>
        </Route>
        <Route path='/About'>
          <Nav/>
          <About/>
        </Route>
        <Route exact path="/Map">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
