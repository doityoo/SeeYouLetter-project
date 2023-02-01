import { createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist";


const initialState = {
  isAuthenticated: false,
  isUserEmail: "",
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    },
    // logout(state) {
    //   state.isAuthenticated = false;
    // },
    userEmail(state, action) { 
      state.isUserEmail = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
})

export const authActions = authSlice.actions;
export default authSlice.reducer;