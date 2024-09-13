import { configureStore } from "@reduxjs/toolkit";
import toDosReducer from "./features/toDosSlice";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    toDos: toDosReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
