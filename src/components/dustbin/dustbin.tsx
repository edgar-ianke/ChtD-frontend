import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "../ui/button/button";
import styles from "./dustbin.module.scss";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../services/features/toDosSlice";

export const Dustbin = () => {
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (id) => {
      dispatch(deleteTask(id));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const dropStyle = canDrop && isOver ? styles.isOver : canDrop ? styles.canDrop : "";
  return (
    <div ref={drop} className={`${styles.button} ${dropStyle}`}>
      <Button>
        <DeleteIcon fontSize="large" />
      </Button>
    </div>
  );
};
