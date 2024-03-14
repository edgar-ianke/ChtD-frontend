import { createSlice, createAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

type TInitState = {
  todos: {
    id: number;
    title: string;
    description: string;
    status: string;
  }[];
};
const initState:TInitState = {
    todos: []
}

export const toDosSlice = createSlice({
  name: "todos",
  initialState: initState,
  reducers: {
    add: (state, action) => {
      state.todos = action.payload;
    },
  },
});

const deleteAll = ()

export const { add } = toDosSlice.actions;
export default toDosSlice.reducer;
