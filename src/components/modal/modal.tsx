import { FC, ReactElement } from "react";
import styles from "./modal.module.css";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modal-root") as HTMLLIElement;

interface IModal {
  children?: ReactElement;
  closeFunc: any;
  redirectTo?: string;
}

export const Modal: FC<IModal> = ({ children, closeFunc, redirectTo = "/" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const close = () => {
    navigate(redirectTo, { replace: true });
    dispatch(closeFunc);
  };
  return ReactDOM.createPortal(
    <>
      <ModalOverlay handleClose={close}>
        <div className={`${styles.modal} pad-12`}>
          {children}
          <div className={styles.xmark}>
            <FontAwesomeIcon onClick={close} icon={faXmark} size="2x" color="black" />
          </div>
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
};
