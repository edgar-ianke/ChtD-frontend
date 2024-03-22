import { useForm } from "react-hook-form";
import styles from "./form.module.scss";
import { FC, } from "react";
import { Button } from "../ui/button/button";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTask, closeModal } from "../../services/features/toDosSlice";
import { States } from "../../types/States";

type FormValues = {
  title: string;
  description: string;
};

export const TaskForm: FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = (data: FormValues) => {
    const task = { id: uuidv4(), title: data.title, description: data.description, status: States.tasks };
    dispatch(addTask(task))
    dispatch(closeModal())
  };
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <label className={styles.label} htmlFor="title">
        Title:
      </label>
      <input
        {...register("title", {
          required: "This field is required to fill",
        })}
        id="title"
        type="text"
        placeholder="Enter title"
        className={styles.input}
      ></input>
      <div className={styles.errorBar}>
        {errors?.title && <p className={styles.error}>{errors.title?.message as string}</p>}
      </div>
      <label className={styles.label} htmlFor="description">
        Description:
      </label>
      <textarea
        {...register("description", {
          required: "This field is required to fill",
          minLength: {
            value: 10,
            message: "Minimum simbols required: 10",
          },
        })}
        id="description"
        placeholder="Enter description"
        className={styles.textarea}
      ></textarea>
      <div className={styles.errorBar}>
        {errors?.description && <p className={styles.error}>{errors.description?.message as string}</p>}
      </div>
      <Button extraClass={styles.submit} type="submit">
        Push task
      </Button>
    </form>
  );
};
