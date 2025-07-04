"use client";
import React from "react";
import styles from "./finish.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes";

export default function Finish(props: any) {
  const { navigateToHome } = props;
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <div className={styles.topImg} onClick={navigateToHome}>
            <img src="/logo-with-text.svg" alt="" />
          </div>
          <div className={styles.textSection}>
            <FaCheckCircle className="text-primary text-[96px] text-center w-full justify-center" />

            <p className={styles.heading}>
              Parabéns! Seu condomínio está cadastrado!
            </p>
            <div className={styles.paragraph}>
              Obrigado pela sua inscrição! Você receberá um e mail de
              confirmação e também as informações para pagamento do seu plano e
              para onde enviar o comprovante, caso ainda não tenha feito.
            </div>
            <div className={styles.paragraph}>
              Após o envio do comprovante de pagamento, você receberá um e-mail
              em até 24 horas com seu nome de usuário e senha assim que sua
              conta for ativada.{" "}
            </div>
            <div className={styles.btn}>
              <button onClick={() => router.push(Routes.LOGIN)}>
                Ir para página de entrada
              </button>
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <img src="/assets/login-new.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
