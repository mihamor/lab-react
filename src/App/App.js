import React, { Component } from 'react';
import MainRouter from '../MainRouter/MainRouter';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../style.css';


class App extends Component {
  render() {
    //here insert footer, header
    return (
      <React.Fragment>
        <CssBaseline />
          <MainRouter/>
      </React.Fragment>
    );
  }
}

export default App;
