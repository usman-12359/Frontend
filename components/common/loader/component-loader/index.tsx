
"use client"
import HashLoader from "react-spinners/HashLoader";
import styles from "./component-loader.module.scss"


export const HashLoaderCom = () => {
    return (
        <div className={styles.container}>
            <HashLoader
                color="#F36B31"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};