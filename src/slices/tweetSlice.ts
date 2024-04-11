import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../store/store';
import { ReactNode } from 'react';

interface Tweet {
  text: ReactNode;
  id: number;
  content: string;
  userId: number;
}

interface TweetState {
  tweets: Tweet[];
}

const initialState: TweetState = {
  tweets: [],
};

const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    postTweetSuccess(state, action: PayloadAction<Tweet>) {
      state.tweets.push(action.payload);
    },
    removeTweet(state, action: PayloadAction<number>) {
      state.tweets = state.tweets.filter(tweet => tweet.id !== action.payload);
    },
  },
});

export const {postTweetSuccess, removeTweet} = tweetsSlice.actions;

export const postTweetAndNotify =
  (tweetContent: string, userId: number): AppThunk =>
  async dispatch => {
    try {

      dispatch(
        postTweetSuccess({
          id: Math.random(), content: tweetContent, userId,
          text: undefined
        }),
      );
   
    } catch (error) {

    }
  };

export const deleteTweetAndNotify =
  (tweetId: number): AppThunk =>
  async dispatch => {
    try {
   
      dispatch(removeTweet(tweetId));
  
    } catch (error) {
    }
  };

export default tweetsSlice.reducer;
