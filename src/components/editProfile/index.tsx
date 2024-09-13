import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import styles from "./style.module.scss";
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../services/features/toDosSlice";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import store, { RootState } from "../../services/store";
import { closeEditModal, editProfile } from "../../services/features/userSlice";

type FormValues = {
  username: string;
  email: string;
  about: string;
  avatar: string;
};

export const EditProfileForm: FC = () => {
  const [errorDescription, setErrorDescription] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      email: userInfo.email!,
      username: userInfo.username!,
      avatar: userInfo.avatar!,
      about: userInfo.about!,
    },
  });
  const onSubmit = (data: FormValues) => {
    store.dispatch(editProfile(data));
    dispatch(closeEditModal());
    navigate(-1);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <p className={`text ${styles.label}`}>email:</p>
      <input
        className={`text ${styles.input}`}
        {...register("email", {
          required: "This field is required to fill",
        })}
        id="email"
        type="text"
        placeholder="Fill this field"
      />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      <p className={`text ${styles.label}`}>username:</p>
      <input
        className={`text ${styles.input}`}
        {...register("username", {
          required: "This field is required to fill",
        })}
        id="username"
        type="text"
        placeholder="Fill this field"
      />
      {errors.username && <p className={styles.error}>{errors.username.message}</p>}
      <p className={`text ${styles.label}`}>avatar:</p>
      <input
        className={`text ${styles.input}`}
        {...register("avatar", {
          required: "This field is required to fill",
        })}
        id="avatar"
        type="text"
        placeholder="Fill this field"
      />
      {errors.avatar && <p className={styles.error}>{errors.avatar.message}</p>}
      <p className={`text ${styles.label}`}>about:</p>
      <input
        className={`text ${styles.input}`}
        {...register("about", {
          required: "This field is required to fill",
        })}
        id="about"
        type="text"
        placeholder="Fill this field"
      />
      {errors.about && <p className={styles.error}>{errors.about.message}</p>}
      <Button sx={{ width: "96px" }} type="submit" variant="contained" endIcon={<SendIcon />}>
        Save
      </Button>
    </form>
  );
};
