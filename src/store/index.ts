import { configureStore } from "@reduxjs/toolkit";
import refreshNotesReducer from "./refreshNotes";
import userInfoReducer from "./userInfo";
import dialogDisplayReducer from "./dialogDisplay";

export const store = configureStore({
  reducer: {
    refreshNotes: refreshNotesReducer,
    userInfo: userInfoReducer,
    dialogDisplay: dialogDisplayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
