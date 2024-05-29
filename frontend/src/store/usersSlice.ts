import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { User, Users, activeUser } from '../types';

const initialState: Users = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state = [...state, action.payload];
    },
    addUsers: (state, action: PayloadAction<User[]>) => {
      state.push(...action.payload);
      console.log(state);
    },
    addActiveProp: (state, action: PayloadAction<activeUser[]>) => {
      return state.map(user => {
        return {
          ...user,
          socketId: action.payload.find(activeUser => activeUser.username === user.username && activeUser.socketId)
            ? action.payload.find(activeUser => activeUser.username === user.username && activeUser.socketId)!.socketId
            : null,
        };
      });
      console.log(state);
    },
  },
});

export const { addUser, addUsers, addActiveProp } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
