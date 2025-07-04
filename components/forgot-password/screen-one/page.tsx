"use client"
import React from 'react'
import styles from "./screen-one.module.scss"
import { RotatingLines } from 'react-loader-spinner'
export default function ScreenOne(props: any) {
    const { navigateToHome, formik, loading, navigateToLogin } = props
    return (
        <div className={styles.leftWrapper}>
            <div className={styles.topImg} onClick={navigateToHome}>
                <img src="/logo-with-text.svg" alt="" />
            </div>
            <div className={styles.textSection}>
                <p className={styles.heading}>Esqueceu sua senha</p>
                <div className={styles.paragraph}>
                    Por favor, insira seu e-mail registrado para redefinir sua senha
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.inputHeading}>E-mail</div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Digite seu e-mail"
                        {...formik.getFieldProps("email")}
                    />
                </div>
                {formik.touched.email && formik.errors.email ? (
                    <div className={styles.errorStyle}>
                        {formik.errors.email}
                    </div>
                ) : null}
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
                            "Enviar OTP"
                        )}
                    </button>
                </div>
            </form>
            <div className={styles.needAccount} onClick={navigateToLogin}>
                Voltar ao login
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
