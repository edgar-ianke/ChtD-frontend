import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { Navigate, useLocation } from "react-router-dom";

interface IProtected {
  component: ReactElement;
}

export const Protected: FC<IProtected> = ({ component }) => {
  const { logedIn } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  if (logedIn) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  return component;
};
