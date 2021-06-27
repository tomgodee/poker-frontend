import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from '../services/room';
import type { RootState } from '../store/store';
import { Room } from '../types/room';

export const getRoom = createAsyncThunk('room/get', async (id: number) => {
  const response = await roomService.getOne(id);
  return response.data;
});

interface Status {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: any;
}

interface RoomState extends Room, Status {}

export const slice = createSlice({
  name: 'room',
  initialState: {
    id: 0,
    max_number_of_player: 0,
    random_seat: false,
    seat_selectable: false,
    type: 'texas',
    user_id: 0,
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoom.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getRoom.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.id = action.payload.id;
      state.max_number_of_player = action.payload.max_number_of_player;
      state.random_seat = action.payload.random_seat;
      state.seat_selectable = action.payload.seat_selectable;
      state.type = action.payload.type;
      state.user_id = action.payload.user_id;
    });
    builder.addCase(getRoom.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? '';
    });
  },
});

// export const {} = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectRoom = (state: RootState) => state.room;

export default slice.reducer;
