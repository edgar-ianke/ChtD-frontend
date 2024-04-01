import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { fakeRequest } from "../../utils/fakeRequest";
import { TInitState, Ttask } from "../../types/types";
import { States } from "../../types/States";

export const initState: TInitState = {
  taskFormVisible: false,
  taskDetailsVisible: false,
  data: null,
  currTask: null,
  tasks: null,
  inprogress: null,
  done: null,
};

export const toDosSlice = createSlice({
  name: "todos",
  initialState: initState,
  reducers: {
    getData: (state, action) => {
      state.tasks = action.payload.filter((item: Ttask) => item.status === States.tasks);
      state.inprogress = action.payload.filter((item: Ttask) => item.status === States.inprogress);
      state.done = action.payload.filter((item: Ttask) => item.status === States.done);
    },
    openTaskForm: (state) => {
      state.taskFormVisible = true;
    },
    closeModal: (state) => {
      state.taskFormVisible = false;
      state.taskDetailsVisible = false;
    },
    addTask: (state, action) => {
      state.tasks!.push(action.payload);
    },
    openTaskDetails: (state) => {
      state.taskDetailsVisible = true;
    },
    setCurrTask: (state, action) => {
      const status: States = action.payload.status;
      state.currTask = state[status]!.filter((item) => item.id === action.payload.id)[0];
    },
    editTask: (state, action) => {
      const status: States = action.payload.status;
      const index = state[status]!.findIndex((item) => item.id === state.currTask?.id);
      state.currTask!.description = action.payload.description;
      state[status]!.splice(index, 1, state.currTask!);
    },
    deleteTask: (state, action) => {
      const status: States = action.payload.status;
      state[status] = state[status]!.filter((item) => item.id !== action.payload.id);
    },
    changeStatus: (state, action) => {
      const { currStatus, nextStatus } = action.payload;
      const index = state[currStatus as States]!.findIndex((item) => item.id === action.payload.id);
      const task = state[currStatus as States]!.splice(index, 1)[0];
      task!.status = action.payload.nextStatus;
      state[nextStatus as States]?.push(task);
    },
    moveTask: (state, action) => {
      const status: States = action.payload.status;
      state[status]!.splice(action.payload.hoverIndex, 0, state[status]!.splice(action.payload.dragIndex, 1)[0]);
    },
  },
});

export const fetchData = () => {
  return async (dispatch: Dispatch) => {
    const data = await fakeRequest();
    dispatch(getData(data));
    return data
  };
};
 type t = ReturnType<typeof fetchData>
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
  moveTask,
} = toDosSlice.actions;
export default toDosSlice.reducer;
