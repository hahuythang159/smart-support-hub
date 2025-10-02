import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDecodedToken, getToken } from '@/utils/tokenUtils';
import { AuthState } from '@/types';

const token = typeof window !== 'undefined' ? getToken() : null;
const decodedToken = getDecodedToken(token);

const initialState: AuthState = {
  token,
  isAuthenticated: !!token,
  userId: decodedToken?.id ?? null,
  role: decodedToken?.role ?? null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      const decoded = getDecodedToken(token);

      if (decoded) {
        state.token = token;
        state.userId = decoded.id;
        state.role = decoded.role;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        state.error = 'Token is invalid or expired';
      }
    },

    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
