import { TAddTodo, TChangeStatus, TEditProfile, TSignIn, TSignUp } from "../types/types";

const baseUrl = "http://localhost:3000";

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json().then((data) => Promise.resolve(data));
  }
  return res.json().then((err) => {
    return Promise.reject(err);
  });
};

const setToken = (data: any) => {
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
    return data;
  } else {
    return;
  }
};

const headersWithContentType = { "Content-Type": "application/json" };
const headersWithAuthorizeFn = () => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

export const registerUser = (signUpData: TSignUp) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify(signUpData),
  })
    .then(checkResponse)
    .then(setToken);
};

export const loginUser = ({ username, password }: TSignIn) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ username, password }),
  })
    .then(checkResponse)
    .then(setToken);
};

export const getUserInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getTodoListsApi = () => {
  return fetch(`${baseUrl}/todo/list`, {
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const changeTodoStatus = ({ newtodoListId, todoId }: TChangeStatus) => {
  return fetch(`${baseUrl}/todo/list`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({ newtodoListId, todoId }),
  }).then(checkResponse);
};

export const addTodoList = ({ name }: { name: string }) => {
  return fetch(`${baseUrl}/todo/list`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({ name }),
  }).then(checkResponse);
};

export const deleteTodoList = (id: number) => {
  return fetch(`${baseUrl}/todo/list/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const updateTodo = (id: number, data: { description: string }) => {
  return fetch(`${baseUrl}/todo/task/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const assignTodoApi = (id: number) => {
  return fetch(`${baseUrl}/todo/task/assign/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const findTodo = (id: number) => {
  return fetch(`${baseUrl}/todo/task/${id}`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const createTodo = (data: TAddTodo) => {
  return fetch(`${baseUrl}/todo/task`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const deleteTodo = (id: number) => {
  return fetch(`${baseUrl}/todo/task/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const addCommentApi = (id: number, text: string) => {
  return fetch(`${baseUrl}/todo/task/comment/${id}`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({ text }),
  }).then(checkResponse);
};

export const editProfileApi = (data: TEditProfile) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(data),
  }).then(checkResponse);
};
