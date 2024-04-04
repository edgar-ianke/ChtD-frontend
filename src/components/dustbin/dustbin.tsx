import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./dustbin.module.scss";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../services/features/toDosSlice";
import { Button } from "@mui/material";

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
    <div ref={drop} className={`${dropStyle} mgb-12`}>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </div>
  );
};
