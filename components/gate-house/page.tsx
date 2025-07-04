"use client"
import classNames from 'classnames'
import HeaderBar from '../common/header/page'
import SubscriberDetail from '../subscriber/details/page'
import styles from "./gate-house.module.scss"
export default function GateHouse() {
  return (
    <div className={classNames(["custom-class", styles.wrapper])}>
      <HeaderBar title="Painel do Portaria" mode="Mudar para Painel do Assinante" />
      <SubscriberDetail />
    </div>
  )
}
