import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavBgWhite: false,
  scrollY: 0,
  isOnHoverNavLink: false,
  isShowGetStarted: false,
};

const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setScrollY(state, action) {
      state.scrollY = action.payload;
    },
    setIsNavBgWhite(state, action) {
      state.isNavBgWhite = action.payload;
    },
    setIsOnHoverNavLink(state, action) {
      state.isOnHoverNavLink = action.payload;
    },
    setIsShowGetStarted(state, action) {
      state.isShowGetStarted = action.payload;
    },
  },
});

export default utilSlice.reducer;
export const {
  setScrollY,
  setIsNavBgWhite,
  setIsOnHoverNavLink,
  setIsShowGetStarted,
} = utilSlice.actions;
export const isNavBgWhite = (state) => state.util.isNavBgWhite;
export const scrollY = (state) => state.util.scrollY;
export const isOnHoverNavLink = (state) => state.util.isOnHoverNavLink;
export const isShowGetStarted = (state) => state.util.isShowGetStarted;
