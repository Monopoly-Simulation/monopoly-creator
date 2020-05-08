import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Alert } from 'antd';
import NavBar from '@/components/NavBar';
import Home from '@/pages/Home';
import Create from '@/pages/Create';
import Job from '@/pages/Job';

function App() {
  return (
    <Router>
      <NavBar />
      <Alert banner closable type="info" message="Please connect to NYU network before creating jobs or fetching job results." />
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
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
