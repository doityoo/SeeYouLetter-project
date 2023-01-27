import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	context: "",
};

const textBodySlice = createSlice({
	name: 'textBody',
	initialState: initialState,
	reducers: {
		setTextBody(state, action) {
			state.context = action.payload;
		},
		// logout(state) {
		//   state.isAuthenticated = false;
		// },
	},
});

export const textBodyActions = textBodySlice.actions;
export default textBodySlice.reducer;
