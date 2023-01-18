import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    },
  },
})

export const authActions = authSlice.actions;
export default authSlice.reducer;