import React, { memo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Button from "../atoms/Button";

import styles from "./Modal.module.css";

const Portal = ({ id, children }) => {
  const el = useRef(
    document.getElementById(id) || document.createElement("div")
  );
  const elCurrent = el.current;
  useEffect(() => {
    elCurrent.id = id;
    if (document.body) {
      document.body.appendChild(elCurrent);
    }
    return () => {
      if (elCurrent.parentElement) {
        elCurrent.parentElement.removeChild(elCurrent);
      }
    };
  });
  return createPortal(children, elCurrent);
};
memo(Portal);

const Modal = ({
  header,
  okButtonLabel,
  okButtonHandler,
  cancelButtonLabel,
  cancelButtonHandler,
  children,
  closeButtonHandler,
  isShown,
  setIsShown,
  showClose,
  showOk,
  buttonSize
}) => {
  const handleClose = event => {
    event.stopPropagation();
    setIsShown(!isShown);
    closeButtonHandler(event);
  };

  const handleOk = event => {
    event.stopPropagation();
    setIsShown(!isShown);
    okButtonHandler();
  };

  const handleCancel = event => {
    event.stopPropagation();
    setIsShown(!isShown);
    cancelButtonHandler(event);
  };

  const renderOkButton = () => {
    return showOk && okButtonLabel.length > 0 ? (
      <Button id="okButton" type="button" onClick={handleOk}>
        {okButtonLabel}
      </Button>
    ) : null;
  };

  const renderCancelButton = () => {
    return cancelButtonLabel && cancelButtonLabel.length > 0 ? (
      <Button id="cancelButton" type="button" onClick={handleCancel}>
        {cancelButtonLabel}
      </Button>
    ) : null;
  };

  return isShown ? (
    <Portal id="modal-root">
      <div className={styles.wrapper}>
        <div
          className={styles.background}
          id="handleClose"
          onClick={handleClose}
          role="button"
          tabIndex={0}
        />
        <div className={styles.modal}>
          <div>
            {header ? <h2>{header}</h2> : null}
            {showClose && (
              <div className={styles.closeIcon} onClick={handleClose}>
                X
              </div>
            )}
          </div>
          <div className={styles.body}>{children}</div>
          <div>
            {renderOkButton()}
            {renderCancelButton()}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};

Modal.defaultProps = {
  header: null,
  okButtonHandler: () => {},
  closeButtonHandler: () => {},
  cancelButtonHandler: () => {},
  okButtonLabel: "OK",
  cancelButtonLabel: "",
  isShown: false,
  setIsShown: () => {},
  showClose: true,
  showOk: true
};

export default Modal;
