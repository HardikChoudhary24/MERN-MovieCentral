import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    pageNum:1,
  },
  reducers: {
    getPageNum: (state, action) => {
      state.pageNum = action.payload;
    },

  },
});
export const { getPageNum } = searchSlice.actions;
export default searchSlice.reducer;
