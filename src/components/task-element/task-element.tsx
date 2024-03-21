import { FC, ReactElement, ReactNode, useRef } from "react";
import { Task } from "../task/task";
import { Ttask } from "../../types/types";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { moveTask } from "../../services/features/toDosSlice";
import { useDispatch } from "react-redux";

interface IProps {
  item: Ttask;
  index: number;
}

export const TaskElement: FC<IProps> = ({ item, index }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const id = item.id;
  const [{ isDragging }, drag] = useDrag({
    type: "taskElement",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
if (isDragging) {
}
  const [{ handlerId }, drop] = useDrop({
    accept: "taskElement",
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
      console.log(item.id)
      console.log(dragIndex)
      item.index = hoverIndex;
      dispatch(moveTask({ hoverIndex, dragIndex }));

      return;
    },
  });
  drag(drop(ref));
  return (
    <div ref={ref} data-handler-id={handlerId}>
      <Task key={item.id} title={item.title} description={item.description} id={item.id} status={item.status} />
    </div>
  );
};
