import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Welcome from './Welcome';
import Home from './Home';
import Success from './Success'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path="/algorhythm-discover-weekly/" component={Welcome}/>
            <Route path="/algorhythm-discover-weekly/home" component={Home}/>
            <Route path="/algorhythm-discover-weekly/success" component={Success}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
