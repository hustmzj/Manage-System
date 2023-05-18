import { configureStore } from "@reduxjs/toolkit";
import { listSlice } from "./list";

export const store = configureStore({
  reducer: {
    list: listSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
