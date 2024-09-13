import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import styles from "./style.module.scss";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addList, addTodo, closeTaskListModal } from "../../services/features/toDosSlice";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TAddTodo } from "../../types/types";
import store from "../../services/store";

type FormValues = {
  title: string;
};

export const TaskListForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: "onSubmit" });
  const onSubmit = (data: FormValues) => {
    store.dispatch(addList(data.title));
    dispatch(closeTaskListModal());
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
      <Button sx={{ width: "96px" }} type="submit" variant="contained" endIcon={<SendIcon />}>
        Save
      </Button>
    </form>
  );
};
