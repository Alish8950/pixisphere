import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photographers: [],
  selectedPhotographer: null,
  loading: false,
  error: null
};




const photographerSlice = createSlice({
  name: 'photographer',
  initialState,
  reducers: {
    setPhotographers: (state, action) => {
      state.photographers = action.payload;
    },
    setSelectedPhotographer: (state, action) => {
      state.selectedPhotographer = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setPhotographers, 
  setSelectedPhotographer, 
  setLoading, 
  setError 
} = photographerSlice.actions;

export default photographerSlice.reducer;
