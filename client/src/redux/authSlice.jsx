import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    email: "",
    token: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = "";
      state.token = "";
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
