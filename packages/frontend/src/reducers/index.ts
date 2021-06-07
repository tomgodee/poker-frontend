import { combineReducers } from 'redux';
import reduxCounter from './reduxCounter';
import reduxName from './reduxName';
import user from './user';

const reduxRootReducer = combineReducers({
  reduxCounter,
  reduxName,
});

export {
  reduxCounter,
  reduxName,
  user,
};

export default reduxRootReducer;
