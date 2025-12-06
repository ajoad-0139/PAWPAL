// import axios from '../Utils/axios';
import axios from 'axios';
import { Toaster } from '@/Components/ui/sonner';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { messages } from './Transport';

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await axios.post(
      'https://www.pawpalbd.com/api/user/api/login',
      data
    );
    console.log(response.data.user);
    if (response.data.user.isVerified == false) {
      return thunkAPI.rejectWithValue({
        message: 'Please Verify your mail and retry...',
      });
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response
        ? { message: error.response.data }
        : { message: 'Login failed' }
    );
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://www.pawpalbd.com/api/user/api/create',
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response
          ? { message: error.response.data }
          : { message: 'Signup failed' }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://www.pawpalbd.com/api/user/api/logout',
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: 'Logout failed' }
      );
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  authStatus: false,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload, 'from setUser');
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setAuthStatus(state, action) {
      state.authStatus = action.payload;
    },
    setProfilePicture(state, action) {
      console.log(action.payload, 'setProfilePicture');
      if (state.user) {
        console.log(state.user.user.profilePicture, 'prevProfilePicture');
        state.user.user.profilePicture = action.payload;
        const tempUser = state.user;
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(tempUser));
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // console.log(action.payload);
        // state.user = action.payload;
        // state.authStatus = true;

        // localStorage.removeItem("user");
        // localStorage.setItem("user", JSON.stringify(action.payload));
        state.isLoading = false;
        toast.success(
          'Account Successfully Created. Please verify your mail to login to your account '
        );
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
        const { error, message } = action.payload;
        state.isLoading = false;
        toast.error(action.payload.message);
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.message);
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
        state.authStatus = true;

        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(action.payload));
        toast.success('Successfully logged in');
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authStatus = false;
        state.isLoading = false;
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.error('Logout failed:', action.payload);
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
export const { setToken, setUser, setAuthStatus, setProfilePicture } =
  authSlice.actions;
export const user = (state) => state.auth.user;
export const authStatus = (state) => state.auth.authStatus;
export const authIsLoading = (state) => state.auth.isLoading;
