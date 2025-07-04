"use client"
import React, { useCallback, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./modal.module.scss";
export default function Modal(Prop: any) {
  const {
    visible,
    onClose,
    children,
    btn,
    editUnit,
    editCondominuim,
    isDelete,
    isTakePhoto,
    isParcel,
    postPayload,
    payload
  } = Prop;

  const escFunction = useCallback(
    (e: any) => {
      if (e.type === "click") {
        e.preventDefault();
        onClose();
      }
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => { }, [visible, onClose, escFunction]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.removeEventListener("click", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("click", escFunction, false);
    };
  }, [escFunction]);

  if (visible) {
    return (
      <div className={styles.modal}>
        <OutsideClickHandler onOutsideClick={onClose}>
          <div className={isParcel ? styles.isParcel : isTakePhoto ? styles.isTakePhoto : isDelete ? styles.isDelete : editCondominuim ? styles.editCondominuim : editUnit ? styles.editUnit : styles.outer}>
            {postPayload || payload ? "" : btn ? <RxCross2 className={styles.IconClose} onClick={onClose} /> : null}
            {children}
          </div>
        </OutsideClickHandler>
      </div>
    );
  } else {
    return null;
  }
}
