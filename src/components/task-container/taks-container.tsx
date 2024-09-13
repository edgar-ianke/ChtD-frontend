import styles from "./taks-container.module.css";
import { States } from "../../types/States";
import { useSelector } from "react-redux";
import { Ttask, Ttodo } from "../../types/types";
import store, { RootState } from "../../services/store";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { TaskElement } from "../task-element/task-element";
import { changeStatus, deleteList } from "../../services/features/toDosSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ITaskContainer {
  id: number;
  name: string;
  status: string;
  todos: Ttodo[];
}

export const TaskContainer: React.FC<ITaskContainer> = ({ id, name, status, todos }) => {
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Record<any, any>) => {
      if (item.status !== status) {
        const itemId = item.id;
        store.dispatch(changeStatus({ newtodoListId: id, todoId: itemId }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleDelete = () => {
    store.dispatch(deleteList(id));
  };

  return (
    <div ref={drop} className={`${styles.main} pad-12`}>
      <div className={styles.header}>
        <h2 className={`${styles.title} text`}>{name}</h2>
        {todos.length === 0 && name !== "todo" && (
          <Button
            onClick={handleDelete}
            sx={{ width: "32px", height: "24px" }}
            size="small"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Del
          </Button>
        )}
      </div>
      <div className={styles.taskContainer}>
        {todos.length > 0 ? (
          todos.map((todo: Ttodo, i) => {
            return <TaskElement key={todo.id} todo={todo} status={status} index={i} />;
          })
        ) : (
          <p className={styles.plug}>Nothing here...</p>
        )}
      </div>
    </div>
  );
};
