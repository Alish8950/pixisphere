import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photographers: [],
  loading: true,
  error: null
};

const photographerSlice = createSlice({
  name: 'photographer',
  initialState,
  reducers: {
    setPhotographers: (state, action) => {
      state.photographers = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setPhotographers, setLoading, setError } = photographerSlice.actions;
export default photographerSlice.reducer; 