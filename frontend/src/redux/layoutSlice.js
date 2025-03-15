import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNavbar: true,
  showFooter: true,
};

const layoutSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    hideNavbar: (state) => {
      state.showNavbar = false;
    },
    showNavbar: (state) => {
      state.showNavbar = true;
    },
    hideFooter: (state) => {
      state.showFooter = false;
    },
    showFooter: (state) => {
      state.showFooter = true;
    },
  },
});

export const { hideNavbar, showNavbar, hideFooter, showFooter } = layoutSlice.actions;

export default layoutSlice.reducer;
