import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import authenticationService, { AUTHENTICATION_URL } from '../services/authentication';
import { LoginForm } from '../types/user';
import { ACCESS_TOKEN } from '../config/localStorage';
import { LOGIN_PATH } from '../config/paths';
import {
  LOADING,
  IDLE,
  SUCCEEDED,
  FAILED,
} from '../config/status';

interface UserAction {
  name: string;
  money: number;
  id: number;
}

export const login = createAsyncThunk(`${AUTHENTICATION_URL}/login`, async (data: LoginForm) => {
  const response = await authenticationService.login(data);
  return response.data;
});

export const verifyToken = createAsyncThunk(`${AUTHENTICATION_URL}/verifyToken`, async (token: string) => {
  const response = await authenticationService.verifyToken(token);
  return response.data;
});

export const slice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    money: 0,
    id: 0,
    status: IDLE,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = SUCCEEDED;
      state.name = action.payload.name;
      state.money = action.payload.money;
      state.id = action.payload.id;
      localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = FAILED;
      state.error = action.error.message ?? '';
    });
    builder.addCase(verifyToken.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.status = SUCCEEDED;
      state.name = action.payload.name;
      state.money = action.payload.money;
      state.id = action.payload.id;
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.status = FAILED;
      state.error = action.error.message ?? '';
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.replace(LOGIN_PATH);
    });
  },
});

// export const { } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state: any) => state.user;

export default slice.reducer;
