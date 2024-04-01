export type Ttask = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export interface ITask {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export type TInitState = {
  taskFormVisible: boolean;
  taskDetailsVisible: boolean;
  currTask: Ttask | null;
  tasks: Ttask[] | null;
  inprogress: Ttask[] | null;
  done: Ttask[] | null;
  data: null | ITask[]
};