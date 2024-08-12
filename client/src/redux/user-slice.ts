import { createSlice } from "@reduxjs/toolkit";

import { IUserState } from "../interfaces/user-interface.ts";

const initialState: IUserState = {
  currentUser: null,
  client: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCurrentUser, setLoading, setClient } = userSlice.actions;
export default userSlice.reducer;
