import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchData, openTaskForm } from "../../services/features/toDosSlice";
import styles from "./App.module.scss";
import { TaskContainer } from "../task-container/taks-container";
import { States } from "../../types/States";
import store, { RootState } from "../../services/store";

import { Button } from "../ui/button/button";
import { Modal } from "../modal/modal";
import { TaskForm } from "../form/form";
import { TaskDetails } from "../task-details/task-details";
import { Dustbin } from "../dustbin/dustbin";

function App() {
  const dispatch = useDispatch();
  const { taskFormVisible, taskDetailsVisible } = useSelector((state: RootState) => state.toDos);
  useEffect(() => {
    store.dispatch(fetchData());
  }, []);
  const handleAddClick = () => {
    dispatch(openTaskForm());
  };
  return (
    <div className={styles.main}>
      {taskFormVisible && (
        <Modal>
          <TaskForm />
        </Modal>
      )}
      {taskDetailsVisible && (
        <Modal>
          <TaskDetails />
        </Modal>
      )}
      <div className={styles.content}>
        <div className={styles.buttonSection}>
          <div className={`${styles.button}`}>
            <Button onClick={handleAddClick}>Add task</Button>
          </div>
          <Dustbin />
        </div>

        <div className={styles.tasks}>
          <TaskContainer name="Задачи" status={States.tasks} />
          <TaskContainer name="В процессе" status={States.inprogress} />
          <TaskContainer name="Выполнены" status={States.done} />
        </div>
      </div>
    </div>
  );
}

export default App;
