import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../interfaces/auth-interface";

const initialState: IAuthState = {
  token: {
    access_token: "",
    refresh_token: "",
    userId: "",
  },
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignIn: (state, action) => {
      state.token = action.payload;
    },
    setSignUp: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setLoading, setSignIn, setSignUp } = authSlice.actions;
