import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { User, Users } from '../types';

const initialState: Users = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
    addUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, addUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
