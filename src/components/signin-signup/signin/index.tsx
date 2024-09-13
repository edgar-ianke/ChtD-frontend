import { Button, TextField } from "@mui/material";
import style from "../style.module.scss";
import { useForm } from "react-hook-form";
import { TSignIn } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { getUserInfo, loginUser } from "../../../utils/api";
import { signin } from "../../../services/features/userSlice";
import store from "../../../services/store";

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignIn>({ mode: "onChange" });
  const onSubmit = async (data: TSignIn) => {
    await store.dispatch(signin(data));
    navigate("/");
  };
  return (
    <div className={style.main}>
      <form className={style.content} onSubmit={handleSubmit(onSubmit)}>
        <h2>Auth</h2>
        <TextField
          {...register("username", {
            required: "This field is required to fill",
          })}
          type="text"
          id="username"
          variant="outlined"
          label="username"
          helperText={errors.username?.message}
        />
        <TextField
          {...register("password", {
            required: "This field is required to fill",
          })}
          type="password"
          id="password"
          variant="outlined"
          label="password"
          helperText={errors.password?.message}
        />
        <Button sx={{ width: "96px", alignSelf: "center" }} type="submit" variant="contained">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
