"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./signin.module.scss";
import Link from "next/link";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";
import { IoEyeOutline } from "react-icons/io5";
import UseLogin from "./useLogin";
import { Routes } from "@/routes";
const SignIn = () => {
  const {
    formik,
    loading,
    navigateToSignUp,
    active,
    setActive,
    showPass,
    setShowPass,
    navigateToHome,
    navigateToForgotScreen,
  } = UseLogin();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <div className={styles.topImg} onClick={navigateToHome}>
            <img src="/logo-with-text.svg" alt="" />
          </div>
          <div className={styles.textSection}>
            <p className={styles.heading}>Entrar</p>
            <div className={styles.paragraph}>
              Por favor coloque seu e-mail e senha para acessar sua conta.
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.inputHeading}>Email/Id</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Insira seu Email/ID"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.errorStyle}>{formik.errors.email}</div>
            ) : null}
            <div className={styles.inputHeadingForPassword}>
              Senha{" "}
              <span onClick={navigateToForgotScreen}>Esqueci a senha</span>
            </div>
            <div className={styles.inputContainer}>
              <input
                type={showPass ? "text" : "password"}
                className={styles.input}
                placeholder="Insira sua senha"
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
              <div className={styles.errorStyle}>{formik.errors.password}</div>
            ) : null}
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                className={styles.box}
                checked={formik.values.keepMeLoggedIn}
                {...formik.getFieldProps("keepMeLoggedIn")}
              />
              <span className={styles.checkboxText}>Lembrar de mim</span>
            </div>
            {formik.touched.keepMeLoggedIn && formik.errors.keepMeLoggedIn ? (
              <div className={styles.errorStyle}>
                {formik.errors.keepMeLoggedIn}
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
                  "Entrar"
                )}
              </button>
            </div>
          </form>
          <div className={styles.needAccount}>
            Não tem uma conta?
            <Link href={Routes.SIGNUP} className={styles.link}>
              Registre-se
            </Link>
          </div>
          <div className={styles.needAccount}>
            Precisa de ajuda? Envie um e-mail para{" "}
            <a href="mailto:suporte@chegousuaencomenda.com.br">
              suporte@chegousuaencomenda.com.br
            </a>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <img src="/assets/login-new.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
