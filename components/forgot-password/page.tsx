"use client"
import React from 'react'
import styles from "./forgot-password.module.scss"
import { RotatingLines } from 'react-loader-spinner'
import UseForgotPassword from './useForgotPassword'
import ScreenOne from './screen-one/page'
import ScreenTwo from './screen-two/page'
import ScreenThree from './screen-three/page'
import FinishForgotPassword from './finish/page'
export default function ForgotPassword() {
    const { formik, navigateToHome, loading, navigateToLogin, screen, handleResendOTP } = UseForgotPassword()
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {screen === 1 ?
                    <ScreenOne loading={loading} navigateToLogin={navigateToLogin} navigateToHome={navigateToHome} formik={formik} />
                    : screen === 2 ?
                        <ScreenTwo handleResendOTP={handleResendOTP} navigateToHome={navigateToHome} formik={formik} loading={loading} />
                        : screen === 3 ?
                            <ScreenThree navigateToHome={navigateToHome} formik={formik} loading={loading} />
                            : screen === 4 ?
                                <FinishForgotPassword /> :
                                <ScreenOne loading={loading} navigateToLogin={navigateToLogin} navigateToHome={navigateToHome} formik={formik} />
                }
                <div className={styles.rightContainer}>
                    <img src="/assets/login-new.svg" alt="" />
                </div>
            </div>
        </div>
    )
}
