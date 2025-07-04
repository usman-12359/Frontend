import React from 'react'
import styles from "./cards.module.scss"
import classNames from 'classnames'
import CardsItem from './cardItem'
const CardsCompo = () => {

  return (
    <div className={styles.container}>
        <div className={classNames(["custom-class",styles.wrapper])}>
            <CardsItem />
        </div>
        </div>
  )
}

export default CardsCompo