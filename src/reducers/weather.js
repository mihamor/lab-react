import {
  REQUEST_WEATHER,
  RECEIVE_WEATHER
} from '../actions/weather';

const initialState = {
  weatherData : null,
  error : null,
  isFetchingWeather : false
};

function weather(state = initialState, action) {
  switch (action.type) {
    case REQUEST_WEATHER:
      return Object.assign({}, state, {
        error : null,
        isFetchingWeather : true
      })
      case RECEIVE_WEATHER:
        return Object.assign({}, state, {
          weatherData : action.weatherData,
          error : action.error,
          isFetchingWeather : false
        })
    default:
      return state;
  }
}

function combinedReducer(state = initialState, action){
switch (action.type) {
  case REQUEST_WEATHER:
  case RECEIVE_WEATHER:
    return weather(state, action);
  default:
    return state;
  }
}
export default combinedReducer;