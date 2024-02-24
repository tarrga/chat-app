import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
