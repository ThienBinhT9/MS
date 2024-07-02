import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../interfaces/auth-interface";

const initialState: IAuthState = {
  token: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    signIn: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setLoading } = authSlice.actions;
