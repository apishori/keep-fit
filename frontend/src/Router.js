import React, { Component } from 'react';
import Login from './Login';
import HomeScreen from './HomeScreen';
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends Component {



  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path="/HomeScreen/:id" component={HomeScreen} />
        </div>
      </Router>
    );
  }
}

export default App;

