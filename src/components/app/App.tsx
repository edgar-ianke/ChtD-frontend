import { useSelector, useDispatch } from "react-redux";
import { mockData } from "../../utils/mockData";
import React from "react";
import { add } from "../../services/features/toDosSlice";
import styles from "./App.module.css";
import { TaskContainer } from "../task-container/taks-container";
import { States } from "../../types/colorStates";
import { fakeRequest } from "../../utils/fakeRequest";
import { increment, decrement, incrementByAmount, selectCount } from "../../services/features/counterSlice";
function App() {
  const count = useSelector(selectCount);
  const data = useSelector((state: any) => state.toDos.todos);
  const dispatch = useDispatch();
  console.log(data);
  dispatch(add(mockData))
  return (
    <div className={styles.main}>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>+2</button>
      <div className={styles.tasks}>
        <TaskContainer name="Задачи" state={States.toDo} />
        <TaskContainer name="В процессе" state={States.inProcess} />
        <TaskContainer name="Выполнены" state={States.done} />
      </div>
    </div>
  );
}

export default App;
