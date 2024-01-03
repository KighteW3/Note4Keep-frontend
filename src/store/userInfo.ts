import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface resultInfo {
  ok: boolean;
  userInfo: {
    username: string;
    email: string;
  };
}
const initialState: resultInfo = {
  ok: false,
  userInfo: {
    username: "Not logged",
    email: "No email"
  }
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateLoginInfo: (state, action: PayloadAction<resultInfo>) => {
      state = action.payload;
      return state;
    }
  },
});

export default userInfoSlice.reducer;

export const { updateLoginInfo } = userInfoSlice.actions;
