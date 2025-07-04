"use client";
import React from "react";
import styles from "./finish.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes";

export default function FinishForgotPassword() {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <div className={styles.topImg} onClick={() => router.push("/")}>
            <img src="/logo-with-text.svg" alt="" />
          </div>
          <div className={styles.textSection}>
            <FaCheckCircle className="text-primary text-[96px] text-center w-full justify-center" />

            <p className={styles.heading}>Password Changed</p>
            <div className={styles.paragraph}>
              Your password has been changed succesfully{" "}
            </div>
            <div className={styles.btn}>
              <button onClick={() => router.push(Routes.LOGIN)}>
                Ir para página de entrada
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
