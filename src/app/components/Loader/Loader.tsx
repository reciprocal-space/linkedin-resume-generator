import React from 'react'

import styles from './loader.module.css'

export const Loader: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.line}></div>
        </div>
    )
}