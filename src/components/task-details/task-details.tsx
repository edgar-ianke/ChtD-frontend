import { useDispatch, useSelector } from "react-redux";
import styles from "./task-details.module.scss";
import store, { RootState } from "../../services/store";
import React, { useEffect, useState } from "react";
import { assignTodo, closeTaskDetailsModal, editTodo, removeTodo } from "../../services/features/toDosSlice";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import DOMPurify from "dompurify";
import formatDate from "../../utils/formatDate";
import { useNavigate, useParams } from "react-router-dom";
import { AssignmentIndOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

export const TaskDetails = () => {
  const id = useParams().taksId;
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const task = useSelector((state: RootState) => state.toDos.currTask);
  const userInfo = useSelector((state: RootState) => state.user.info);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if (ref.current && task?.description) {
      const cleanHTML = DOMPurify.sanitize(task.description);
      ref.current.innerHTML = cleanHTML;
    }
  }, [task]);

  const handleSaveClick = () => {
    if (ref.current) {
      const content = ref.current.innerHTML;
      if (content === "") {
        setError(true);
        ref.current.focus();
        return;
      }
      setEditMode(false);
      setError(false);
      console.log(id);
      store.dispatch(editTodo({ id: task!.id, description: content }));
    }
  };

  const handleDeleteClick = () => {
    store.dispatch(removeTodo(task!.id));
    dispatch(closeTaskDetailsModal());
    navigate("/", { replace: true });
  };

  const handleAssignClick = () => {
    store.dispatch(assignTodo(task!.id));
  };

  return (
    <div className={styles.main}>
      <div className={styles.task}>
        <h4 className={`${styles.title} text mgb-12`}>{task?.title}</h4>
        <div className={styles.divWrapper}>
          <div ref={ref} contentEditable={editMode} className={styles.editableDiv}></div>
          {error && <p className={styles.error}>Fill the field</p>}
        </div>
        {editMode && (
          <Button disabled={false} type="button" onClick={handleSaveClick} variant="contained" endIcon={<SendIcon />}>
            Save
          </Button>
        )}
        {!editMode && (
          <div className={styles.buttonGroup}>
            {task?.author.username === userInfo.username && (
              <>
                <Button type="button" startIcon={<EditIcon />} variant="contained" onClick={handleEditClick}>
                  Edit
                </Button>
                <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
                  Delete
                </Button>
              </>
            )}
            {!task?.assignee && (
              <Button variant="contained" startIcon={<AssignmentIndOutlined />} onClick={handleAssignClick}>
                Assign
              </Button>
            )}
          </div>
        )}
      </div>
      <div className={`${styles.detailsWrap} padl-12`}>
        <div className={styles.details}>
          <div>
            <p className={`${styles.author} text-bold  padr-12`}>Author:</p>
            <div className={styles.authorInfo}>
              <p>{task?.author.username}</p>
              <img className={styles.avatar} src={task?.author.avatar} alt="404" />
            </div>
          </div>
          <div>
            <p className={`${styles.author} text-bold  padr-12`}>Assigned:</p>
            {task?.assignee ? (
              <div className={styles.authorInfo}>
                <p className={styles.author}>{task?.assignee.username}</p>
                <img className={styles.avatar} src={task?.assignee.avatar} alt="404" />
              </div>
            ) : (
              <p>-</p>
            )}
          </div>
          <p className={styles.date}>{task && formatDate(task.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
