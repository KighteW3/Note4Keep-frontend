import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface state {
  refresh: number;
  refreshMessage: string | null;
}

const initialState: state = {
  refresh: 0,
  refreshMessage: null,
};

export const refreshNotesSlice = createSlice({
  name: "refreshNotes",
  initialState,
  reducers: {
    refreshCount: (state, action: PayloadAction<number>) => {
      state.refresh = action.payload;
      return state;
    },
    refreshLog: (state, action: PayloadAction<string>) => {
      state.refreshMessage = action.payload;
      return state;
    },
  },
});

export default refreshNotesSlice.reducer;

export const { refreshCount, refreshLog } = refreshNotesSlice.actions;
