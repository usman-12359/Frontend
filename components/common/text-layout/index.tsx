import React from "react";
import styles from "./text-layout.module.scss";

function TextPageLayout({ heading, date, description, website, children }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.textContainer}>
                    <div className={styles.heading}>{heading}</div>
                    <div className={styles.date}><b>Data de Vigência:</b> {date}</div>
                    <div className={styles.paragraph}>{description}</div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default TextPageLayout;