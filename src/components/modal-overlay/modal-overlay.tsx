import { FC, ReactNode, useEffect } from "react";
import styles from "./modal-overlay.module.css";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById("modal-root") as HTMLLIElement;

interface IModalOverlay {
  children?: ReactNode;
  handleClose: () => void;
}

export const ModalOverlay: FC<IModalOverlay> = ({ handleClose, children }) => {
  const handleEscClose = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") handleClose();
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}>{children}</div>
    </>,
    modalRoot
  );
};
