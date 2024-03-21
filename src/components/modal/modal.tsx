import { FC, ReactElement } from "react";
import styles from "./modal.module.css";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/features/toDosSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modal-root") as HTMLLIElement;

interface IModal {
  children?: ReactElement;
}

export const Modal: FC<IModal> = ({ children }) => {
  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeModal());
  };
  return ReactDOM.createPortal(
    <>
      <ModalOverlay handleClose={close}>
        <div className={styles.modal}>
          {children}
          <div className={styles.xmark}>
            <FontAwesomeIcon onClick={close} icon={faCircleXmark} size="2x" color="white" />
          </div>
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
};
