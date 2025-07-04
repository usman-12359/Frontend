import React from 'react'
import styles from "./no-data.module.scss"
export default function NoData() {
    return (
        <div className={styles.container}>
            <img src="/assets/no-data.svg"  alt='no-data'/>
        </div>
    )
}
