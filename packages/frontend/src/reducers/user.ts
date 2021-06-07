import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import authenticationService from '../services/authentication';
import { LoginFormInputs } from '../pages/Login/types';
import { ACCESS_TOKEN } from '../constants/localStorage';

interface UserAction {
  name: string;
  money: number;
  id: number;
}

export const login = createAsyncThunk('user/login', async (data: LoginFormInputs) => {
  const response = await authenticationService.login(data);
  return response.data;
});

export const slice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    money: 0,
    id: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    change: (state, action: PayloadAction<UserAction>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.name = action.payload.name;
    },
  },
  extraReducers: {
    [login.pending.toString()]: (state) => {
      state.status = 'loading';
    },
    [login.fulfilled.toString()]: (state, action) => {
      state.status = 'succeeded';
      state.name = action.payload.name;
      state.money = action.payload.money;
      state.id = action.payload.id;
      localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
    },
    [login.rejected.toString()]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { change } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state: any) => state.user;

export default slice.reducer;
