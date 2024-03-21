import { configureStore } from "@reduxjs/toolkit";
import toDosReducer from "./features/toDosSlice";

 const store = configureStore({
  reducer: {
    toDos: toDosReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store