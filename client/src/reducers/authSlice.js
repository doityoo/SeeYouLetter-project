import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
})

export const authActions = authSlice.actions;
export default authSlice.reducer;