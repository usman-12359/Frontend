"use client"
import React, { ReactNode } from 'react'
import styles from "./admin-layout.module.scss"
import DashboardNavbar from '../dashboard-navbar/page'

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <DashboardNavbar />
      <div className={styles.container}>
        {children}
        </div>
    </div>
  )
}
