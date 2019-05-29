import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';

import Home from '../Home/Home';
import NoMatch from './NoMatch';
import Login from '../Login/Login';
import { withRouter } from 'react-router-dom';
import { compareUsers } from '../utils';
import { connect } from 'react-redux';
import '../style.css';

class MainRouter extends Component{
  constructor () {
    super()
    this.state = {
      user : null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.user && !compareUsers(nextProps.user, prevState.user)){
      console.log("new user");
      console.log(nextProps.user);
      return { user: nextProps.user };
    }else return null;
  }


  render() {
    return (
        <main className="content">
          <Switch>
            <Route
            exact path="/"
            render={props => <Login user={this.state.user} />}
            />
            <Route
            path="/home"
            render={props => <Home user={this.state.user}/>}
            />
            <Route component={NoMatch} />
          </Switch>
        </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.auth.loggedInUser
  }
};


export default withRouter(connect(mapStateToProps)(MainRouter));