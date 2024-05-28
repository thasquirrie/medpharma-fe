import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    getLoggedInUser: null,
    documents: [],
  },
  reducers: {
    setGetLoggedInUser: (state, action) => {
      state.getLoggedInUser = action.payload.data;
    },
    setDocuments: (state, action) => {
      state.documents = action.payload.data;
    },
  },
});

export const { setGetLoggedInUser, setDocuments } = dashboardSlice.actions;

export default dashboardSlice.reducer;
