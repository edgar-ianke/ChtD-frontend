export type Ttask = {
  id: number;
  title: string;
  description: string;
  status: string;
  date: string;
};

export type Ttodo = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  author: any;
  assignee?: any;
};

export type Ttasklist = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  todos: Ttodo[];
};

export type TTodosState = {
  taskFormVisible: boolean;
  taskListFormVisible: boolean;
  taskDetailsVisible: boolean;
  currTask: Ttodo | null;
  data: null | Ttask[];
  tasklists: Ttasklist[];
};
export type TUserState = {
  editProfileVisible: boolean;
  info: {
    id: null | number;
    createdAt: null | string;
    username: null | string;
    email: null | string;
    about: null | string;
    avatar: null | string;
  };
  logedIn: null | boolean;
};

export type TSignUp = { username: string; password: string; about: string; avatar: string; email: string };
export type TSignIn = { username: string; password: string };
export type TChangeStatus = { newtodoListId: number; todoId: number };
export type TAddTodo = { title: string; description: string; todoListName: string };
export type TEditProfile = {
  username?: string;
  about?: string;
  avatar?: string;
  email?: string;
  password?: string;
};
