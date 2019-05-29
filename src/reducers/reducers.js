import weather from './weather';
import auth from './auth';
import { combineReducers } from 'redux';

export default combineReducers({
  weather,
  auth, 
}); 