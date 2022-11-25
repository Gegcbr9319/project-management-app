import React from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <span className={styles.circle}></span>
    </div>
  );
};
