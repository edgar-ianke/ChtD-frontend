import React, { FC } from "react";
import styles from "./button.module.scss";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
    extraClass? : string;
}

export const Button: FC<IProps> = ({ children, type = "button", extraClass, ...rest }) => {
  return (
    <button className={`${styles.button} ${extraClass}`} {...rest}>
      {children}
    </button>
  );
};
