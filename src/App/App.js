import React from 'react';
import MainRouter from '../MainRouter/MainRouter';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../style.css';


function App (){
  return (
    <React.Fragment>
      <CssBaseline />
        <MainRouter/>
    </React.Fragment>
  );
}

export default App;
