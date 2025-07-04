"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { PinInput } from 'react-input-pin-code';
import styles from "./step-four.module.scss";
import { RotatingLines } from "react-loader-spinner";

const StepFour = (props: any) => {
    const { formik, handleBack, isVerifying, handleResendOTP, navigateToHome, isRegistered } = props

    const [pin, setPin] = useState("")
    const values = pin.split("").concat(Array(4).fill("")).slice(0, 4);

    useEffect(() => {
        if (pin?.length > 3) {
            formik.setFieldValue("newPin", pin)
        }
    }, [pin])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.leftWrapper}>
                    <div className={styles.topImg} onClick={navigateToHome}>
                        <img src="/logo-with-text.svg" alt="" />
                    </div>
                    <div className={styles.textSection}>
                        <div className={styles.title} onClick={handleBack}><MdOutlineArrowBack /> &nbsp; Passo 3 de 4</div>
                        <p className={styles.heading}>Verificação da conta</p>

                        <div className={styles.paragraph}>
                            Por favor, entre o código de verificação que
                            enviamos para o e-mail informado (Caso não
                            tenha verificar lixeira e/ou caixa de spam).
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit} className={styles.otpInputsParent}>
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
                            <button type="submit" disabled={isVerifying}>
                                {isVerifying ? <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="22"
                                    visible={true}
                                />
                                    : isRegistered ? "Próximo" : "Próximo"
                                }
                            </button>
                        </div>
                    </form>
                    <div className={styles.needAccount}>
                        Não recebeu nenhum código?
                        <div className={styles.link} onClick={() => handleResendOTP()}>
                            Enviar código novamente.
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <img src="/assets/login-new.svg" alt="" />
                </div>
            </div>
        </div>
    )
}


export default StepFour;