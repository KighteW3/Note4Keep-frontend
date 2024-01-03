import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface dialogStruct {
  content: JSX.Element | null;
  turn: boolean;
}

const initialState: dialogStruct = {
  content: null,
  turn: false,
};

export const dialogDisplaySlice = createSlice({
  name: "dialogDisplay",
  initialState,
  reducers: {
    dialogToShow: (state, action: PayloadAction<JSX.Element>) => {
      state.content = action.payload;
      return state;
    },
    turnDialog: (state, action: PayloadAction<boolean>) => {
      state.turn = action.payload;
      return state;
    },
  },
});

export default dialogDisplaySlice.reducer;

export const { dialogToShow, turnDialog } = dialogDisplaySlice.actions;
