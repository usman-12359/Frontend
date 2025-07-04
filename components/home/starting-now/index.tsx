"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from "./starting-now.module.scss"
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Routes } from '@/routes'
const StartingNow = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={classNames(["custom-class", styles.wrapper])}>
       
        <div className={styles.cardsSection}>
          <div className={styles.textSection}>
            <div className={styles.headingText}>Pronto para agilizar e simplificar o gerenciamento de pedidos do seu condomínio?</div>
            <div className={styles.listItemText} onClick={()=>router.push(Routes.SIGNUP)}>Comece agora</div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default StartingNow