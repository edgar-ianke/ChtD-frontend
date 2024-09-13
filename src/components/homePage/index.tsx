import { TaskContainer } from "../task-container/taks-container";
import { States } from "../../types/States";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FC, ReactElement, useEffect } from "react";
import store, { AppDispatch, RootState } from "../../services/store";
import style from "./style.module.scss";
import { openTaskForm, openTaskListForm } from "../../services/features/toDosSlice";
import { Link, Outlet } from "react-router-dom";
import { Ttasklist } from "../../types/types";

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoLists = useSelector((state: RootState) => state.toDos.tasklists);
  useEffect(() => {}, []);
  const handleAddClick = () => {
    dispatch(openTaskForm());
  };
  const handleAddListClick = () => {
    dispatch(openTaskListForm());
  };
  return (
    <>
      <Outlet />
      <main className={`${style.main} padt-12 padb-12`}>
        <div className={style.buttonGroup}>
          <Link to="/new-tasklist">
            <Button variant="contained" onClick={handleAddListClick}>
              Add tasklist
            </Button>
          </Link>
          <Link to="/new-task">
            <Button variant="contained" onClick={handleAddClick}>
              Add task
            </Button>
          </Link>
        </div>
        <div className={style.tasks}>
          {todoLists.map((todolist: Ttasklist, i) => {
            return (
              <TaskContainer
                key={i}
                id={todolist.id}
                name={todolist.name}
                status={todolist.name}
                todos={todolist.todos}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};
export default HomePage;
