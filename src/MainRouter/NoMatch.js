import React, { Component } from 'react';
import styles from '../styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class NoMatch extends Component {

  render() {
    const classes = this.props.classes;
    return(
      <React.Fragment>
        <Container fixed className={classes.container}>
        <div className={classes.noMatchMessage}>
          <Typography variant="h1" component="h1">
            404 Not found
          </Typography>
          <Link component={RouterLink} className={classes.noMatchLink} to="/">
            Click here to sign in
          </Link>
        </div>
        </Container>
      </React.Fragment>);
  }
} 

export default withStyles(styles)(NoMatch);