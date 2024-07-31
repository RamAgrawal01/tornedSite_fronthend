import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSmallScreen: false,
  isMediumScreen: false,
  isLargeScreen: false,
};

const mediaQuerySlice = createSlice({
  name: 'mediaQuery',
  initialState:initialState,
  reducers: {
    setMediaQueryState(state, action) {
      state.mediaQuery = action.payload
    },
  },
});

export const { setMediaQueryState } = mediaQuerySlice.actions;
export default mediaQuerySlice.reducer;