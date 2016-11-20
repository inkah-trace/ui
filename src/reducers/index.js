import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import traceReducer from './trace';

export default combineReducers({
  trace: traceReducer,
  routing: routerReducer
});
