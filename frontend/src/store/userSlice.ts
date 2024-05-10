import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { User } from '../types';

const initialState: User = {
  username: null,
  id: null,
  receiverId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setReceiverId: (state, action: PayloadAction<number>) => {
      state.receiverId = action.payload;
    },
  },
});

export const { setUsername, setUserId, setReceiverId } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
