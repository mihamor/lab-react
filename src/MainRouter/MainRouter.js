import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';

import Home from '../Home/Home';
import Login from '../Login/Login';
import { withRouter } from 'react-router-dom';
import { compareUsers } from '../utils';
import { connect } from 'react-redux';
import '../style.css';

class MainRouter extends Component{
  constructor () {
    super()
    // this.onLogin = this.onLogin.bind(this);
    // this.onLogout = this.onLogout.bind(this);
    this.state = {
      user : null
    };
  }
  // componentDidMount() {
  //   this.setState({
  //      user: { username : cookie.load('username') }       
  //   });
  // }
 
  // onLogin(username) {
  //   this.setState({
  //     user: { username }       
  //   });
  //   cookie.save('username', username, { path: '/' })
  // }

  // onLogout() {
  //   cookie.remove('username', { path: '/' })
  // }

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
            {/* <Route path='/profile' render={props => <Redirect to={path_to_user}/>}/>
            <Route path='/developer/v3' component={ApiInfo}/>
            {/*
            <Route path='/admin_menu' render={props => <AdminMenu user={this.state.user}/>}/>
            <Route 
            path ='/tracks'
            render={props => <TracksRoute user={this.state.user} socket={this.socket}/>}
            />
            <Route 
            path ='/users'
            render={props => <UsersRoute user={this.state.user}/>}
            />
            <Route 
            path ='/playlists'
            render={props => <PlaylistsRoute user={this.state.user}/>}
            />
            <Route 
            path='/auth' 
            render={props => <Auth match='/auth'/>}
            />
            <Route component={NoMatch} /> */} */}
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