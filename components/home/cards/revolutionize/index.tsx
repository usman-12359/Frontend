/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from "./cardItem.module.scss"
import { CardsImage } from '../Data'
import classNames from 'classnames'
const Revolutionize = () => {
  return (
    <div className={classNames(["custom-class", styles.cookerBuy])} id="IA">

      <div className={styles.rightSection}>
        <div className={styles.textSection}>
          <div className={styles.preHeadingText}>Gerencie suas encomendas</div>
          <div className={styles.headingText}>com a ajuda da Inteligência Artificial</div>
          <div className={styles.listItemText}>
          Revolucione seu condomínio com o Chegou Sua Encomenda
          Com a Inteligência Artificial, os pacotes são identificados e notificados instantaneamente com apenas um clique. Ideal para condomínios e edifícios comerciais, nosso sistema permite que todos saibam imediatamente quando os pacotes estão na porta, trazendo mais conforto e eficiência aos condôminos e administradores.
          </div>
        </div>

      </div>
      <div className={styles.leftSection}>
          <img src="/assets/revelotion.svg" alt='header' />
      </div>
    </div>
  )
}

export default Revolutionize