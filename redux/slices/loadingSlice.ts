import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingScreenOpen: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    closeLoadingScreen: (state) => {
      state.loadingScreenOpen = false;
    },
    openLoadingScreen: (state) => {
      state.loadingScreenOpen = true;
    },
  },
});

export const { closeLoadingScreen, openLoadingScreen } = loadingSlice.actions;

export default loadingSlice.reducer;
