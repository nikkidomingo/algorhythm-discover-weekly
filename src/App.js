import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Welcome from './Welcome';
import Home from './Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
