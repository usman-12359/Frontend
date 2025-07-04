"use client"
import classNames from 'classnames'
import React from 'react'
import styles from "./admin.module.scss"
import HeaderBar from '../common/header/page'
import AdminCondominuim from './condominuim/page'
export default function Admin() {
  return (
    <div className={classNames(["custom-class", styles.wrapper])}>
      <HeaderBar title="Admin" />
      <AdminCondominuim />
    </div>
  )
}
