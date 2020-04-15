import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Home from '@/pages/Home';
import Create from '@/pages/Create';
import Job from '@/pages/Job';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/job/:uid">
          <Job />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
