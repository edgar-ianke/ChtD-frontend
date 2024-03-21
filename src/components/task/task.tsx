import { FC } from "react";
import styles from "./task.module.css";
import { useDispatch } from "react-redux";
import { openTaskDetails, setCurrTask } from "../../services/features/toDosSlice";
import { useDrag } from "react-dnd";
import { Ttask } from "../../types/types";

export const Task: FC<Ttask> = ({ id, title, description, status }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id, title, description, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));


  const handleClick = () => {
    dispatch(setCurrTask(id));
    dispatch(openTaskDetails());
  };

  return (
    <div ref={drag} onClick={handleClick} className={`${styles.card}`}>
      <h2 className={`${styles.title} text`}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
