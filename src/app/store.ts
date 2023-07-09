import { configureStore } from "@reduxjs/toolkit";
import { trainsTableSlice } from "../features/trains-table/model/trainsSlice";

export const store = configureStore({
  reducer: {
    trains: trainsTableSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
