/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from "./cardItem.module.scss"
import { CardsImage } from '../Data'
import classNames from 'classnames'
const CardsItem = () => {
  return (
    <div className={classNames(["custom-class", styles.cookerBuy])} id="sobre-nós">
      <div className={styles.leftSection}>
        {CardsImage.map((item, key) => (
          <img src={item.icon} alt='header' key={key} />
        ))}
      </div>
      <div className={styles.rightSection}>
        <div className={styles.textSection}>
          <div className={styles.preHeadingText}>Sobre Nós</div>
          <div className={styles.headingText}>Confiável, Inteligente, Instantâneo</div>
          <div className={styles.listItemText}>
            O Chegou Sua Encomenda é uma solução para condomínios que precisam controlar e notificar a chegada de pacotes de forma rápida e eficiente.
            Com a ajuda da inteligência artificial os destinatários dos pacotes são avisados que suas encomendas chegaram com apenas um click.
          </div>
          
          <div className={styles.listItemText}>
            Nosso foco está na praticidade e segurança: o sistema registra cada pacote recebido, notifica imediatamente o destinatário e oferece um histórico organizado de entregas.
            Com isso, porteiros, administradores e condôminos ganham mais tranquilidade, evitando filas na portaria, falhas de comunicação ou extravios de encomendas.
          </div>
          <div className={styles.listItemText}>
          Ao unir inovação tecnológica e excelência no atendimento, buscamos simplificar o dia a dia de quem mora ou trabalha em condomínios, trazendo mais agilidade e transparência para todos os envolvidos no processo de recebimento de encomendas.
          </div>
        </div>

      </div>
    </div>
  )
}

export default CardsItem