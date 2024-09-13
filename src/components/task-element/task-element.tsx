import { FC, useRef } from "react";
import { Ttask, Ttodo } from "../../types/types";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { openTaskDetails, setCurrTask } from "../../services/features/toDosSlice";
import { useDispatch } from "react-redux";
import styles from "./task-element.module.scss";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

interface IProps {
  todo: Ttodo;
  index: number;
  status: string;
}

export const TaskElement: FC<IProps> = ({ todo, index, status }) => {
  const { title, description, id, createdAt, updatedAt } = todo;
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: () => {
      return { id, title, description, status, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (isDragging) {
  }
  const [{ handlerId }, drop] = useDrop({
    accept: "task",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverIndex;
      return;
    },
  });
  drag(drop(ref));
  const variant: Record<string, string> = {
    tasks: "Primary",
    inprogress: "Light",
    done: "Success",
  };
  const handleClick = () => {
    dispatch(setCurrTask({ id, status }));
    dispatch(openTaskDetails());
  };

  return (
    <div ref={ref} data-handler-id={handlerId}>
      <Link className={styles.link} to={`/task/${id}`} onClick={handleClick}>
        <Card bg={"primary"} key={"primary"} text={"light"} className="mb-2">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title> {title} </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};
