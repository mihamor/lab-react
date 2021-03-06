import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../actions/weather';
import { logout } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Home extends Component {
  constructor(props) {
    super(props);
    this.getWeatherData = props.getWeatherData;
    this.onLogout = this.onLogout.bind(this);
    this.doLogout = props.doLogout;
  }
  onLogout(){
    this.doLogout();
  }

  componentDidMount(){
    if(this.getWeatherData && this.props.user) this.getWeatherData();
  }

  render() {
    const classes = this.props.classes;

    if(!this.props.user) return <Redirect to="/" />
    else if(this.props.isFetchingWeather || !this.props.weatherData) 
      return (
        <React.Fragment>
          <Container maxWidth="xs">
          <div className={classes.paper}>
            <CircularProgress size={200} className={classes.progress} />
            <Typography component="h1" variant="h5">
              Looking at weather in Kyiv...
            </Typography>
          </div>
          </Container>
        </React.Fragment>
      );
    else {
      const weatherList = this.props.weatherData.consolidated_weather;
      return (
      <React.Fragment>
        <div className={classes.appBar}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.toolbarTitle}>
                Welcome back, {this.props.user.username}!
              </Typography>
              <Button color="inherit" onClick={this.onLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {weatherList.map(weather => (
              <Grid item key={weather.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}
                    title="Weather icon"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {weather.weather_state_name}
                    </Typography>
                    <Typography>
                      Max: {Math.round(weather.max_temp)} °C
                      <br/>
                      Min: {Math.round(weather.min_temp)} °C
                      <br/>
                      <img src="https://www.metaweather.com/static/img/windarrow.svg"
                        style={ { transform: `rotate(${weather.wind_direction}deg)` }} 
                        title={weather.wind_direction_compass}
                        alt="Wind direction"
                        className={classes.windIcon}/>
                        {`${Math.round(weather.wind_speed)}mph`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </React.Fragment>);
    }
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    getWeatherData: () => {
        dispatch(fetchWeather());
    },
    doLogout: () => {
      dispatch(logout())
    }
  }
};

const mapStateToProps = (state) => {
  return {
    isFetchingWeather : state.weather.isFetchingWeather,
    weatherData : state.weather.weatherData,
    error : state.weather.error,
    user : state.auth.loggedInUser
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
