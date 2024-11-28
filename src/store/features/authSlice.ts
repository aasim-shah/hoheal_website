import { createSlice, Slice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
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
    handleLogout: (state) => {
      console.log("logout");
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setRole, handleLogout } = authSlice.actions;
export default authSlice.reducer;
