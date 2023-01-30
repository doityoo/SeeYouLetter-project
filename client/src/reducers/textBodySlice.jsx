import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	context: "",
	initBody: true,
};

const textBodySlice = createSlice({
	name: 'textBody',
	initialState: initialState,
	reducers: {
		setTextBody(state, action) {
			state.context = action.payload;
		},
	},
});

export const textBodyActions = textBodySlice.actions;
export default textBodySlice.reducer;
