import { FC, ReactNode, useEffect, useRef } from "react";
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
  const handleOverlayClose = (evt: React.MouseEvent) => {
    if (evt.target === evt.currentTarget) {
      handleClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);
  return ReactDOM.createPortal(
    <>
      <div onMouseDown={handleOverlayClose} className={styles.overlay}>
        {children}
      </div>
    </>,
    modalRoot
  );
};
