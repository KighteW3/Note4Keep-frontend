import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface state {
	isLoading: boolean;
}

const initialState: state = {
	isLoading: false,
};

export const loadingGlobalSlice = createSlice({
	name: "loadingGlobal",
	initialState,
	reducers: {
		setIsLoadingGlobal: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
			return state;
		},
	},
});

export default loadingGlobalSlice.reducer;

export const { setIsLoadingGlobal } = loadingGlobalSlice.actions;
