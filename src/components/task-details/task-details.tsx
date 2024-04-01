import { useDispatch, useSelector } from "react-redux";
import styles from "./task-details.module.scss";
import { RootState } from "../../services/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button/button";
import { closeModal, editTask } from "../../services/features/toDosSlice";

export const TaskDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const task = useSelector((state: RootState) => state.toDos.currTask);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const handleEditClick = () => {
    setEditMode(!editMode);
    setValue("description", task?.description);
    errors.description = undefined;
  };
  const onSubmit = () => {
    dispatch(editTask({description: getValues("description"), status: task!.status}));
    dispatch(closeModal())
  };
 
  return (
    <div className={styles.main}>
      <h2 className={`${styles.title} text`}>{task?.title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.descriptionSection}>
          {editMode ? (
            <div className={styles.textAreaSection}>
              <textarea
                className={styles.textArea}
                {...register("description", {
                  required: "This field is required to fill",
                  minLength: {
                    value: 10,
                    message: "Minimum simbols required: 10",
                  },
                })}
              ></textarea>
              <div className={styles.errorBar}>
                {errors?.description && <p className={styles.error}>{errors.description?.message as string}</p>}
              </div>
            </div>
          ) : (
            <p className={styles.description}>{task?.description}</p>
          )}
          <div className={styles.editIcon} onClick={handleEditClick}></div>
        </div>
        {editMode && <Button type="submit">Сохранить</Button>}
      </form>
    </div>
  );
};
