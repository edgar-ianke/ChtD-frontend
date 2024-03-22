import styles from "./taks-container.module.css";
import { States } from "../../types/States";
import { useSelector } from "react-redux";
import { Ttask } from "../../types/types";
import { RootState } from "../../services/store";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { changeStatus } from "../../services/features/toDosSlice";
import { TaskElement } from "../task-element/task-element";

interface ITaskContainer {
  name: string;
  status: States;
}

export const TaskContainer: React.FC<ITaskContainer> = ({ name, status }) => {
  const tasks = useSelector((state: RootState) => state.toDos[status]);

  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Record<string, string>) => {
      if (item.status !== status) {
        const { title, description, id } = item;
        const currStatus = item.status;
        dispatch(changeStatus({ id, title, description, currStatus, nextStatus: status }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div ref={drop} className={`${styles.main} ${styles[status]}`}>
      <h2 className={`${styles.title} text-bold`}>{name}</h2>
      <div className={styles.taskContainer}>
        {tasks &&
          tasks
            .filter((item) => item.status === status)
            .map((item: Ttask, i) => {
              return <TaskElement key={item.id} item={item} index={i} />;
            })}
      </div>
    </div>
  );
};
