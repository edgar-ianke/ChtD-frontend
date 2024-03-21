export type Ttask = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export type TInitState = {
  taskFormVisible: boolean;
  taskDetailsVisible: boolean;
  currTask: Ttask | null;
  tasks: Ttask[] | null;
};
