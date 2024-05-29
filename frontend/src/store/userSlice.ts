import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { User } from '../types';

const initialState: User = {
  username: null,
  id: null,
  socketId: null,
  profilePicturePath: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return { ...action.payload };
    },
    updateProfilePicturePath: (state, action: PayloadAction<string>) => {
      state.profilePicturePath = action.payload;
    },
  },
});

export const { setUser, updateProfilePicturePath } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
