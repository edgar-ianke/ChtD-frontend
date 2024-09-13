import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";

import { TAddTodo, TChangeStatus, TTodosState } from "../../types/types";
import {
  addCommentApi,
  addTodoList,
  assignTodoApi,
  changeTodoStatus,
  createTodo,
  deleteTodo,
  deleteTodoList,
  getTodoListsApi,
  updateTodo,
} from "../../utils/api";

const initState: TTodosState = {
  taskFormVisible: false,
  taskListFormVisible: false,
  taskDetailsVisible: false,
  data: null,
  currTask: null,
  tasklists: [],
};

export const getTodoLists = createAsyncThunk("todos/getTodoLists", async () => {
  const todos = await getTodoListsApi();
  return todos;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (data: TAddTodo) => {
  const newTodo = await createTodo(data);
  return newTodo;
});

export const changeStatus = createAsyncThunk("todos/changeStatus", async ({ newtodoListId, todoId }: TChangeStatus) => {
  const newTodoList = await changeTodoStatus({ newtodoListId, todoId });
  return newTodoList;
});

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, description }: { id: number; description: string }) => {
    return await updateTodo(id, { description });
  }
);

export const removeTodo = createAsyncThunk("todos/removeTodo", async (id: number) => {
  return await deleteTodo(id);
});

export const assignTodo = createAsyncThunk("todos/assignTodo", async (id: number) => {
  return await assignTodoApi(id);
});

export const addComment = createAsyncThunk("todos/addComment", async ({ id, text }: { id: number; text: string }) => {
  return await addCommentApi(id, text);
});

export const deleteList = createAsyncThunk("todos/deleteList", async (id: number) => {
  await deleteTodoList(id);
  return id;
});

export const addList = createAsyncThunk("todos/addList", async (name: string) => {
  return await addTodoList({ name });
});

export const toDosSlice = createSlice({
  name: "todos",
  initialState: initState,
  reducers: {
    openTaskForm: (state) => {
      state.taskFormVisible = true;
    },
    openTaskListForm: (state) => {
      state.taskListFormVisible = true;
    },
    closeTaskModal: (state) => {
      state.taskFormVisible = false;
      state.taskDetailsVisible = false;
      state.taskListFormVisible = false;
    },
    closeTaskListModal: (state) => {
      state.taskFormVisible = false;
      state.taskDetailsVisible = false;
      state.taskListFormVisible = false;
    },
    closeTaskDetailsModal: (state) => {
      state.taskFormVisible = false;
      state.taskDetailsVisible = false;
      state.taskListFormVisible = false;
    },
    openTaskDetails: (state) => {
      state.taskDetailsVisible = true;
    },
    setCurrTask: (state, { payload }) => {
      const tasklistIndex = state.tasklists.findIndex((tasklist) => tasklist.name === payload.status);
      const task = state.tasklists[tasklistIndex].todos.find((todo) => todo.id === payload.id);
      state.currTask = task ? task : null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoLists.fulfilled, (state, { payload }) => {
      state.tasklists = payload;
      state.tasklists.sort((a, b) => a.id - b.id);
    });
    builder.addCase(addTodo.fulfilled, (state, { payload }) => {
      const tasklistIndex = state.tasklists.findIndex((tasklist) => tasklist.name === payload.todoList.name);
      const newTask = {
        id: payload.id,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        title: payload.title,
        description: payload.description,
        author: payload.author,
      };
      state.tasklists[tasklistIndex].todos.push(newTask);
    });
    builder.addCase(editTodo.fulfilled, (state, { payload }) => {
      const tasklistIndex = state.tasklists.findIndex((tasklist) => tasklist.name === payload.todoList.name);
      const todoIndex = state.tasklists[tasklistIndex].todos.findIndex((todo) => todo.id === payload.id);
      state.tasklists[tasklistIndex].todos[todoIndex].description = payload.description;
    });
    builder.addCase(removeTodo.fulfilled, (state, { payload }) => {
      const tasklistIndex = state.tasklists.findIndex((tasklist) => tasklist.name === payload.todoList.name);
      const todoIndex = state.tasklists[tasklistIndex].todos.findIndex((todo) => todo.id === payload.id);
      state.tasklists[tasklistIndex].todos.splice(todoIndex, 1);
    });
    builder.addCase(changeStatus.fulfilled, (state, { payload }) => {
      state.tasklists = payload;
      state.tasklists.sort((a, b) => a.id - b.id);
    });
    builder.addCase(deleteList.fulfilled, (state, { payload }) => {
      const taskListIndex = state.tasklists.findIndex((tasklist) => tasklist.id === payload);
      state.tasklists.splice(taskListIndex, 1);
    });
    builder.addCase(addList.fulfilled, (state, { payload }) => {
      state.tasklists.push(payload);
      state.tasklists.sort((a, b) => a.id - b.id);
    });
    builder.addCase(assignTodo.fulfilled, (state, { payload }) => {
      const tasklistIndex = state.tasklists.findIndex((tasklist) => tasklist.name === payload.todoList.name);
      const todoIndex = state.tasklists[tasklistIndex].todos.findIndex((todo) => todo.id === payload.id);
      state.tasklists[tasklistIndex].todos[todoIndex].assignee = payload.assignee;
      state.currTask!.assignee = payload.assignee;
    });
  },
});

export const {
  closeTaskDetailsModal,
  closeTaskListModal,
  closeTaskModal,
  openTaskForm,
  setCurrTask,
  openTaskDetails,
  openTaskListForm,
} = toDosSlice.actions;
export default toDosSlice.reducer;
