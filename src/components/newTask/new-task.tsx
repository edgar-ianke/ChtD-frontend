import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import styles from "./new-task.module.scss";
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTodo, closeTaskModal } from "../../services/features/toDosSlice";
import { States } from "../../types/States";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TAddTodo } from "../../types/types";
import store from "../../services/store";

type FormValues = {
  title: string;
  description: string;
};

export const TaskForm: FC = () => {
  const [errorDescription, setErrorDescription] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: "onSubmit" });
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("data-placeholder", "Enter task description here...");
    }
  }, []);
  const onSubmit = (data: FormValues) => {
    if (ref.current?.innerHTML === "") {
      setErrorDescription(true);
      ref.current.focus();
      return;
    }
    const task: TAddTodo = {
      title: data.title,
      description: ref.current?.innerHTML!,
      todoListName: "todo",
    };
    store.dispatch(addTodo(task));
    dispatch(closeTaskModal());
    navigate("/");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <p className={`text ${styles.label}`}>Title:</p>
      <input
        className={`text ${styles.input}`}
        {...register("title", {
          required: "This field is required to fill",
        })}
        id="title"
        type="text"
        placeholder="Enter title"
      />
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      <p className={`text ${styles.label}`}>Task details:</p>
      <div className={styles.divWrapper}>
        <div ref={ref} id="description" contentEditable className={`text ${styles.editableDiv}`}></div>
        {errorDescription && <p className={styles.error}>This field is required to fill</p>}
      </div>
      <Button sx={{ width: "96px" }} type="submit" variant="contained" endIcon={<SendIcon />}>
        Save
      </Button>
    </form>
  );
};
