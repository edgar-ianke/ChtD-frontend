import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";
import style from "./style.module.scss";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, setEditVisible } from "../../services/features/userSlice";

export const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const handleEditClick = () => {
    dispatch(setEditVisible());
  };
  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };
  return (
    <>
      <Outlet />
      <div className={style.main}>
        <div className={style.content}>
          <img className={style.avatar} alt="avatar" src={user.info.avatar as string} />
          <div className={style.userInfo}>
            <p className={`text-bold ${style.annotation}`}>username:</p>
            <p className={`text ${style.text}`}>{user.info.username}</p>
            <p className={`text-bold ${style.annotation}`}>email:</p>
            <p className={`text ${style.text}`}>{user.info.email}</p>
            <p className={`text-bold ${style.annotation}`}>about me:</p>
            <p className={`text ${style.text}`}>{user.info.about}</p>
          </div>
        </div>
        <div className={style.buttons}>
          {
            <Link to="edit">
              <Button type="button" startIcon={<EditIcon />} variant="contained" onClick={handleEditClick}>
                Edit
              </Button>
            </Link>
          }
          <Button type="button" startIcon={<LogoutIcon />} variant="contained" onClick={handleLogoutClick}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};
