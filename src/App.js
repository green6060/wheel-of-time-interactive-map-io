import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from './Components/Nav/Nav';
import Home from './Pages/Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Nav/>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
