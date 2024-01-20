import { configureStore } from "@reduxjs/toolkit";
import refreshNotesReducer from "./refreshNotes";
import userInfoReducer from "./userInfo";
import dialogDisplayReducer from "./dialogDisplay";
import loadingGlobalReducer from "./loadingState";

export const store = configureStore({
	reducer: {
		refreshNotes: refreshNotesReducer,
		userInfo: userInfoReducer,
		dialogDisplay: dialogDisplayReducer,
		loadingGlobal: loadingGlobalReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
