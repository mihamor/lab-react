import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../actions/weather';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingWeather : props.isFetchingWeather,
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
    else if(this.state.isFetchingWeather) 
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
    else return (
    <div className="home">
    </div>);
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
