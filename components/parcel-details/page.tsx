"use client"
import React from 'react'
import styles from "./parcel-details.module.scss"
import classNames from 'classnames'
import GateHouseDetail from '../gate-house/details/page'
export default function ParcelDetails() {
  
  
  return (
    <div className={classNames(["custom-class", styles.wrapper])}>
      <GateHouseDetail />
      {/* <div className={styles.btnWrapperForMobile}>
        <button className={styles.uploadPhotoMobile}>Upload Photo</button>
        <button className={styles.takePhotoMobile}>Take Photo</button>
      </div> */}
    </div>
  )
}
