import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../actions/weather';
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingWeather : true,
      user : props.user,
      weatherData : props.weatherData,
      error : props.error
    };
    this.getWeatherData = props.getWeatherData;
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.weatherData && nextProps.weatherData !== prevState.weatherData){
      console.log(nextProps.weatherData);
      return { 
        weatherData : nextProps.weatherData,
        user : nextProps.user ? nextProps.user : prevState.user,
        isFetchingWeather : nextProps.isFetchingWeather 
      };
    }
    if(nextProps.isFetchingWeather !== prevState.isFetchingWeather){
      return { 
        isFetchingWeather: nextProps.isFetchingWeather,
        error : nextProps.error
       };
    }
    return null;
  }


  componentDidMount(){
    if(this.getWeatherData && this.state.user) this.getWeatherData();
  }

  
  render() {
    const classes = this.props.classes;

    

    if(!this.state.user) return <Redirect to="/" />
    else if(this.state.isFetchingWeather || !this.state.weatherData) 
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
      const weatherList = this.state.weatherData.consolidated_weather;
      return (
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
                    {/* https://www.metaweather.com/static/img/windarrow.svg */}
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
      </Container>);
    }
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    getWeatherData: () => {
        dispatch(fetchWeather());
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
