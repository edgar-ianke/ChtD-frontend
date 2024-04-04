export type Ttask = {
  id: number;
  title: string;
  description: string;
  status: string;
  date: string;
};

export type TInitState = {
  taskFormVisible: boolean;
  taskDetailsVisible: boolean;
  currTask: Ttask | null;
  tasks: Ttask[] | null;
  inprogress: Ttask[] | null;
  done: Ttask[] | null;
  data: null | Ttask[]
};