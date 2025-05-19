import { configureStore } from '@reduxjs/toolkit';
import photographerReducer from './photographerSlice';

export const store = configureStore({
  reducer: {
    photographer: photographerReducer,
  },
}); 