
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import tweetReducer from '../slices/tweetSlice';
import profileReducer from '../slices/profileSlice';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
