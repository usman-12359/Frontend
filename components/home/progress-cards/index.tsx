/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from "./progress-cards.module.scss"
import classNames from 'classnames'
import { CardsItem, CardsItemTwoDesktop } from './Data'
const ProgressCards = () => {
  return (
    <div className={styles.container} id="nosso-processo">
      <div className={classNames(["custom-class", styles.wrapper])}>
        <div className={styles.cardsSectionForMobile}>
          {CardsItem.map((item,key)=>(
          <div className={styles.textSection} key={key}>
            {/* <div className={styles.headingText}>{item.title}<span>{item.subTitle}</span></div> */}
            <div className={styles.listItemText}>Fácil Utilização</div>
          </div>
          ))}
        </div>
        <div className={styles.cardsSectionForMobile}>
          {CardsItem.map((item,key)=>(
          <div className={styles.textSection} key={key}>
            {/* <div className={styles.headingText}>{item.title}<span>{item.subTitle}</span></div> */}
            <div className={styles.listItemText}>Notificações Automáticas</div>
          </div>
          ))}
        </div>
        <div className={styles.cardsSectionForMobile}>
          {CardsItem.map((item,key)=>(
          <div className={styles.textSection} key={key}>
            {/* <div className={styles.headingText}>{item.title}<span>{item.subTitle}</span></div> */}
            <div className={styles.listItemText}>Controle Centralizado</div>
          </div>
          ))}
        </div>
        {/* <div className={styles.cardsSectionForMobile}>
          {CardsItemTwo.map((item,key)=>(
          <div className={styles.textSection} key={key}>
            <div className={styles.headingText}>{item.title}<span>{item.subTitle}</span></div>
            <div className={styles.listItemText}>{item.desc}</div>
          </div>
          ))}
        </div> */}
        <div className={styles.cardsSection}>
          {CardsItemTwoDesktop.map((item,key)=>(
          <div className={styles.textSection} key={key}>
            {/* <div className={styles.headingText}>{item.title}<span>{item.subTitle}</span></div> */}
            <div className={styles.listItemText}>{item.desc}</div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressCards