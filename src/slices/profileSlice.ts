
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

interface Profile {
  avatar: string | undefined;
  bio: string | undefined;
  profileImageUrl: string;
  username: string;
  followersCount: number;
  followingCount: number;
}

interface Post {
  id: number;
  content: string;
}


interface ProfileState {
  userProfile: Profile;
  userPosts: Post[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  userProfile: {
    profileImageUrl: '',
    username: '',
    followersCount: 0,
    followingCount: 0,
    avatar: undefined,
    bio: undefined,
  },
  userPosts: [],
  loading: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      profileImageUrl: 'https://th.bing.com/th/id/R.f56d53fca2115240aed5aea4fcc9f043?rik=nwOGYxS8rRRUTg&pid=ImgRaw&r=0',
      username: 'leonardo dicaprio',
      followersCount: 100,
      followingCount: 50,
    } as Profile;
  }
);

export const fetchUserPosts = createAsyncThunk(
  'profile/fetchUserPosts',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [] as Post[];
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.userProfile = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchUserPosts.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.userPosts = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default profileSlice.reducer;
