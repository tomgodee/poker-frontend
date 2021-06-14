import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducers/reduxCounter';
import nameReducer from '../reducers/reduxName';
import userReducer from '../reducers/user';
// eslint-disable-next-line import/no-cycle
import roomReducer from '../reducers/room';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    name: nameReducer,
    user: userReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
