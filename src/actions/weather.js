import config from '../config';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';

export function requestWeather() {
  return {
    type : REQUEST_WEATHER,
    error : null
  }
}

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export function receiveWeather(weatherData, err) {
  return {
    type : RECEIVE_WEATHER,
    weatherData : weatherData,
    error : err
  }
}

export function fetchWeather() {
  const reqOptions = {
    mode : "cors"
  };

  return dispatch => {
    dispatch(requestWeather());
    return fetch(`https://cors-anywhere.herokuapp.com/${config.weatherApiUrl}`, reqOptions)
      .then(response => response.json())
      .then (data => dispatch(receiveWeather(data)))
      .catch(err => dispatch(receiveWeather(null, err)));
  };
}

