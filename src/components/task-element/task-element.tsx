import { FC, useRef } from "react";
import { Ttask } from "../../types/types";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { moveTask, openTaskDetails, setCurrTask } from "../../services/features/toDosSlice";
import { useDispatch } from "react-redux";
import styles from "./task-element.module.scss";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

interface IProps {
  item: Ttask;
  index: number;
}

export const TaskElement: FC<IProps> = ({ item, index }) => {
  const { title, description, status, id, date } = item;
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
      dispatch(moveTask({ hoverIndex, dragIndex, status: item.status }));
      return;
    },
  });
  drag(drop(ref));
  const variant: Record<string,string> = {
    'tasks': 'Primary',
    'inprogress': 'Light',
    'done': 'Success'
  }
  const handleClick = () => {
    dispatch(setCurrTask({ id, status }));
    dispatch(openTaskDetails());
  };

  return (
    <div ref={ref} data-handler-id={handlerId}>
      <div onClick={handleClick}>
      <Card
          bg={variant[status].toLowerCase()}
          key={variant[status]}
          text={variant[status].toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '380px' }}
          className="mb-2"
        >
          <Card.Header>{date}</Card.Header>
          <Card.Body>
            <Card.Title> {title} </Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
