import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {},
});

export default authSlice.reducer;
export const {} = authSlice.actions;
