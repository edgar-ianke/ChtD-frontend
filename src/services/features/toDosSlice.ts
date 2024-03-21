import { createSlice, createAction, Dispatch } from "@reduxjs/toolkit";
import { fakeRequest } from "../../utils/fakeRequest";
import { Ttask, TInitState } from "../../types/types";

export const initState: TInitState = {
  taskFormVisible: false,
  taskDetailsVisible: false,
  currTask: null,
  tasks: [],
};

export const toDosSlice = createSlice({
  name: "todos",
  initialState: initState,
  reducers: {
    getData: (state, action) => {
      state.tasks = action.payload;
    },
    openTaskForm: (state) => {
      state.taskFormVisible = true;
    },
    closeModal: (state) => {
      state.taskFormVisible = false;
      state.taskDetailsVisible = false;
    },
    addTask: (state, action) => {
      state.tasks?.push(action.payload);
    },
    openTaskDetails: (state) => {
      state.taskDetailsVisible = true;
    },
    setCurrTask: (state, action) => {
      state.currTask = state.tasks && state.tasks.filter((item) => item.id === action.payload)[0];
    },
    editTask: (state, action) => {
      const index = state.tasks!.findIndex((item) => item.id === state.currTask?.id);
      state.currTask!.description = action.payload;
      state.tasks?.splice(index, 1, state.currTask!);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks!.filter((item) => item.id !== action.payload.id);
    },
    changeStatus: (state, action) => {
      const index = state.tasks!.findIndex((item) => item.id === action.payload.id);
      state.tasks?.splice(index, 1);
      state.tasks?.push(action.payload);
    },
    moveTask: (state, action) => {
      state.tasks!.splice(action.payload.hoverIndex, 0, state.tasks!.splice(action.payload.dragIndex, 1)[0]);
    },
  },
});

export const fetchData = () => {
  return async (dispatch: Dispatch) => {
    const data = await fakeRequest();
    dispatch(getData(data));
  };
};

export const {
  getData,
  closeModal,
  openTaskForm,
  addTask,
  setCurrTask,
  openTaskDetails,
  editTask,
  deleteTask,
  changeStatus,
  moveTask
} = toDosSlice.actions;
export default toDosSlice.reducer;
