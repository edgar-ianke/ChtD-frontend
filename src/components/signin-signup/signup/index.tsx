import { Button, TextField } from "@mui/material";
import style from "../style.module.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../services/store";
import { registerUser } from "../../../utils/api";

type FormValues = {
  email: string;
  password: string;
  username: string;
  avatar: string;
  about: string;
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit = async (data: FormValues) => {
    await registerUser(data);
    navigate("/");
  };
  return (
    <div className={style.main}>
      <form className={style.content} onSubmit={handleSubmit(onSubmit)}>
        <h2>Registration</h2>
        <TextField
          {...register("username", {
            required: "This field is required to fill",
          })}
          type="text"
          id="username"
          variant="outlined"
          label="username"
          helperText={errors.email?.message}
        />
        <TextField
          {...register("email", {
            required: "This field is required to fill",
          })}
          type="email"
          id="email"
          variant="outlined"
          label="email"
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password", { required: true, min: 4 })}
          type="password"
          id="password"
          variant="outlined"
          label="password"
          helperText={errors.password?.message}
        />
        <TextField
          {...register("avatar", { required: true })}
          type="url"
          id="avatar"
          variant="outlined"
          label="avatar"
          helperText={errors.password?.message}
        />
        <TextField
          {...register("about", { required: true, min: 4 })}
          type="text"
          id="about"
          variant="outlined"
          label="about"
          helperText={errors.password?.message}
        />
        <Button sx={{ width: "96px", alignSelf: "center" }} type="submit" variant="contained">
          Sign in
        </Button>
        <p>
          Уже есть аккаунт? <Link to="/signin">Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
