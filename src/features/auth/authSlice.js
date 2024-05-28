import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    logOut: (state) => {
      state.user = null;
    },
    setCredentials: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
  },
  extraReducers: () => {},
});

export const { reset, setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
