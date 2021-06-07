import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducers/reduxCounter';
import nameReducer from '../reducers/reduxName';
import userReducer from '../reducers/user';

export default configureStore({
  reducer: {
    counter: counterReducer,
    name: nameReducer,
    user: userReducer,
  },
});
