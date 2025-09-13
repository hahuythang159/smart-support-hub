import { AuthState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
    loadToken: (state) => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    }
  },
});

export const { loginSuccess, logout, loadToken } = authSlice.actions;
export default authSlice.reducer;
