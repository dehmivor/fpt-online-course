import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './layoutSlice';

const store = configureStore({
  reducer: {
    ui: layoutReducer,
  },
});

export default store;
