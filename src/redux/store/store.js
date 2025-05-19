import { configureStore } from '@reduxjs/toolkit';
import photographerReducer from '../slice/photographerSlice';

const store = configureStore({
  reducer: {
    photographer: photographerReducer,
  },
});

export default store;
