import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import styles from "./form.module.scss";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTask, closeModal } from "../../services/features/toDosSlice";
import { States } from "../../types/States";
import { Box, Button, TextField } from "@mui/material";
import formatDate from "../../utils/formatDate";

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
    const task = { id: uuidv4(), title: data.title, description: data.description, status: States.tasks, date: formatDate(new Date()) };
    dispatch(addTask(task));
    dispatch(closeModal());
  };
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column"}}>
        <h2 className="text">New Task</h2>
        <TextField
          sx={{ width: "400px", marginBottom: "12px" }}
          error={errors.title ? true : false}
          id="title"
          type="text"
          placeholder="Enter title"
          {...register("title", {
            required: "This field is required to fill",
          })}
          label="Enter title"
          variant="standard"
          helperText={errors.title ? errors.title.message : ""}
        />
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
      </Box>
      <Button type='submit' variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </form>
  );
};
