import { createSlice, Slice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: string | null;
  userProfile: any;
}
const initialState: AuthState = {
  token: null,
  role: null,
  userProfile: null,
};

const authSlice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    handleLogout: (state) => {
      state.token = null;
      state.role = null;
      state.userProfile = null;
      localStorage.removeItem("token");
    },
    resetAuth: () => initialState
  },
});

export const { setToken, setRole, setUserProfile, handleLogout, resetAuth } =
  authSlice.actions;
export default authSlice.reducer;
