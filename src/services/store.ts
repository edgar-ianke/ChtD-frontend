import { configureStore } from "@reduxjs/toolkit";
import toDosReducer from "./features/toDosSlice";
import counterReducer from './features/counterSlice'

export default configureStore({
  reducer: {
    toDos: toDosReducer,
    counter: counterReducer
  },
});
