import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Views
import AreasView from './views/AreasView';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ AreasView }/>
      </Switch>
    </Router>
  );
}

export default App;
