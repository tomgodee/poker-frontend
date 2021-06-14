import { combineReducers } from 'redux';
import reduxCounter from './reduxCounter';
import reduxName from './reduxName';
import user from './user';
import room from './room';

const reduxRootReducer = combineReducers({
  reduxCounter,
  reduxName,
});

export {
  reduxCounter,
  reduxName,
  user,
  room,
};

export default reduxRootReducer;
