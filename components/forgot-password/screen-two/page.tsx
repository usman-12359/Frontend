"use client"
import React, { useEffect, useState } from 'react'
import styles from "./screen-two.module.scss"
import { RotatingLines } from 'react-loader-spinner'
import { PinInput } from 'react-input-pin-code';
export default function ScreenTwo(props: any) {
  const { handleResendOTP, navigateToHome, formik, loading } = props

  const [pin, setPin] = useState("")
  const values = pin.split("").concat(Array(4).fill("")).slice(0, 4);

  useEffect(() => {
    if (pin?.length > 3) {
      formik.setFieldValue("newPin", pin)
    }
  }, [pin])
  return (
    <div className={styles.leftWrapper}>
      <div className={styles.topImg} onClick={navigateToHome}>
        <img src="/logo-with-text.svg" alt="" />
      </div>
      <div className={styles.textSection}>
        <p className={styles.heading}>Esqueceu sua senha</p>
        <div className={styles.paragraph}>
          enviamos um código para seu e-mail
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputWrapper}>
          <PinInput
            values={values}
            autoFocus
            autoTab
            required
            borderColor="#DEDEDE"
            errorBorderColor="red"
            focusBorderColor="#F36B31"

            placeholder="0"
            type="number"
            inputStyle={{
              width: '59px',
              height: '59px',
              borderRadius: "8px",
              borderColor: "#DCDFE3",
              display: "flex",
              columnGap: "25px"
            }}
            onChange={(val, idx, allValues) => {
              const newPin = allValues.join("");
              setPin(newPin);

            }}
            size="xs"
          />
        </div>
        <div className={styles.btn}>
          <button type="submit" disabled={loading}>
            {loading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="22"
                visible={true}
              />
            ) : (
              "Verificar"
            )}
          </button>
        </div>
      </form>
      <div className={styles.needAccount} onClick={handleResendOTP}>
        Não recebeu nenhum código? <span className={styles.link}>Reenviar</span>
      </div>
      <div className={styles.needAccount}>
        Precisa de ajuda? Envie um e-mail para{" "}
        <a href="mailto:suporte@chegousuaencomenda.com.br">
          suporte@chegousuaencomenda.com.br
        </a>
      </div>

    </div>
  )
}
