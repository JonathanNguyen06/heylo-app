import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  username: string;
  email: string;
  uid: string;
  bookmarks: string[];
}

const initialState: UserState = {
  name: "",
  username: "",
  email: "",
  uid: "",
  bookmarks: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.bookmarks = action.payload.bookmarks;
    },

    signOutUser: (state) => {
      state.name = "";
      state.username = "";
      state.email = "";
      state.uid = "";
      state.bookmarks = [];
    },
  },
});

export const { signInUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
