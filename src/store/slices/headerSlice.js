import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    buttonClicked:null,
  },
  reducers: {
    getButtonValue: (state, action) => {
      state.buttonClicked = action.payload;
    },
  },
});
export const { getButtonValue } = headerSlice.actions;
export default headerSlice.reducer;
