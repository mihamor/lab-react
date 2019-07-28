import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Home from '../Home/Home';
import NoMatch from './NoMatch';
import Login from '../Login/Login';
import '../style.css';

function MainRouter(){
  return (
    <main className="content">
      <Switch>
        <Route
        exact path="/"
        component={Login}
        />
        <Route
        path="/home"
        component={Home}
        />
        <Route component={NoMatch} />
      </Switch>
    </main>
  );
}

export default MainRouter;