"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./chat-attachments.module.scss";
import Modal from "../../modal";
import Image from "next/image";

interface props {
  handleClose: () => void;
  Open: boolean;
  Data: string | any;
}
const ParcelAttachmentsModal = (props: props) => {
  const { handleClose, Open, Data } = props;
  return (
    <Modal onClose={handleClose} visible={Open} btn={false} plan={true}>
      <div className={styles.wrapper}>
        <div className={styles.attachment}>
            <img
              src={Data}
              alt={Data}
              className="rounded-md object-contain"
            />
        </div>
      </div>
    </Modal>
  );
};

export default ParcelAttachmentsModal;
