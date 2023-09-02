import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice"
import searchReducer from "./slices/searchSlice"
import headerReducer from "./slices/headerSlice"
export const store = configureStore({
  reducer: {
    home: homeReducer,
    search:searchReducer,
    header:headerReducer,
  },
});
