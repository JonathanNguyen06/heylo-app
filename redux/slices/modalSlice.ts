import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupModalOpen: false,
  logInModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signupModalOpen = false;
    },
    openLogInModal: (state) => {
      state.signupModalOpen = true;
    },
    closeLogInModal: (state) => {
      state.signupModalOpen = false;
    },
  },
});

export const {
  openSignUpModal,
  closeSignUpModal,
  openLogInModal,
  closeLogInModal,
} = modalSlice.actions;

export default modalSlice.reducer;
