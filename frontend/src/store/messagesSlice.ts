import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Message } from '../types';

const initialState: Message[] = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      console.log(action.payload);

      state.push(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages;

export default messagesSlice.reducer;
