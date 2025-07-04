"use client"
import React, { useState } from 'react'
import styles from "./screen-three.module.scss"
import { RotatingLines } from 'react-loader-spinner'
import { BsEyeSlashFill } from 'react-icons/bs'
import { IoEyeOutline } from 'react-icons/io5'
export default function ScreenThree(props: any) {
    const { navigateToHome, formik, loading } = props
    const [showPass, setShowPass] = useState<boolean>(false);
    const [reShowPass, setReShowPass] = useState<boolean>(false);

    return (
        <div className={styles.leftWrapper}>
            <div className={styles.topImg} onClick={navigateToHome}>
                <img src="/logo-with-text.svg" alt="" />
            </div>
            <div className={styles.textSection}>
                <p className={styles.heading}>Definir nova senha</p>
                <div className={styles.paragraph}>
                    A senha deve ser diferente da anterior
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.inputHeading}>Senha</div>
                <div className={styles.inputContainer}>
                    <input
                        type={showPass ? "text" : "password"}
                        className={styles.input}
                        placeholder="Digite sua senha"
                        {...formik.getFieldProps("password")}
                    />
                    {!showPass ? (
                        <IoEyeOutline
                            className="text-lg text-[#707070] cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                        />
                    ) : (
                        <BsEyeSlashFill
                            className="text-lg text-[#707070] cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                        />
                    )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className={styles.errorStyle}>
                        {formik.errors.password}
                    </div>
                ) : null}
                <div className={styles.inputHeading}>Digite novamente a senha</div>
                <div className={styles.inputContainer}>
                    <input
                        type={reShowPass ? "text" : "password"}
                        className={styles.input}
                        placeholder="Digite sua senha"
                        {...formik.getFieldProps("repeatPassword")}
                    />
                    {!reShowPass ? (
                        <IoEyeOutline
                            className="text-lg text-[#707070] cursor-pointer"
                            onClick={() => setReShowPass(!reShowPass)}
                        />
                    ) : (
                        <BsEyeSlashFill
                            className="text-lg text-[#707070] cursor-pointer"
                            onClick={() => setReShowPass(!reShowPass)}
                        />
                    )}
                </div>
                {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                    <div className={styles.errorStyle}>
                        {formik.errors.repeatPassword}
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
                            "Confirmar"
                        )}
                    </button>
                </div>
                <div className={styles.needAccount}>
                    Precisa de ajuda? Envie um e-mail para{" "}
                    <a href="mailto:suporte@chegousuaencomenda.com.br">
                        suporte@chegousuaencomenda.com.br
                    </a>
                </div>
            </form>
        </div>
    )
}
