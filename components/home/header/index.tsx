"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from "./header.module.scss"
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Routes } from '@/routes'
const Header = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={classNames(["custom-class", styles.wrapper])}>
        <div className={styles.leftSection}>
          <div className={styles.textSection}>
            <div className={styles.headingText}>Chegou Sua Encomenda <br /> Rapidez, segurança e simplicidade <br /><span>para suas encomendas</span><br /> Avisa de forma rápida e sem incômodos que <br /> suas encomendas chegaram</div>
            <div className={styles.ItemText} onClick={() => router.push(Routes.SIGNUP)}>Cadastre-se Agora</div>
          </div>

        </div>
        <div className={styles.rightSection}>
          <img src="/assets/Parcel.svg" alt='header' />
        </div>
      </div>
    </div>
  )
}

export default Header