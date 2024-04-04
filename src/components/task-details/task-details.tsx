import { useDispatch, useSelector } from "react-redux";
import styles from "./task-details.module.scss";
import { RootState } from "../../services/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { closeModal, editTask } from "../../services/features/toDosSlice";
import { Button, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import SendIcon from "@mui/icons-material/Send";

type FormValues = {
  description?: string;
};

export const TaskDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const task = useSelector((state: RootState) => state.toDos.currTask);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<FormValues>({ mode: "onChange" });
  const dispatch = useDispatch();
  const handleEditClick = () => {
    setEditMode(!editMode);
    setValue("description", task?.description);
    errors.description = undefined;
  };
  const onSubmit = () => {
    dispatch(editTask({ description: getValues("description"), status: task!.status }));
    dispatch(closeModal());
  };

  return (
    <div className={styles.main}>
      <h4 className={`${styles.title} text padb-12`}>{task?.title}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.descriptionSection}>
          {editMode ? (
            <TextField
              sx={{ width: "400px", marginBottom: "12px" }}
              multiline
              error={errors.description ? true : false}
              id="description"
              type="text"
              placeholder="Enter description"
              {...register("description", {
                required: "This field is required to fill",
                minLength: {
                  value: 10,
                  message: "Minimum simbols required: 10",
                },
              })}
              label="Enter description"
              variant="standard"
              helperText={errors.description ? errors.description.message : ""}
            />
          ) : (
            <p className={styles.description}>{task?.description}</p>
          )}
         <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditClick} />
        </div>
        {editMode && <Button type='submit' variant="contained" endIcon={<SendIcon />}>
        Patch
      </Button>}
      </form>
    </div>
  );
};
