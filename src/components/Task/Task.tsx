import React, { useState } from 'react';
import styles from './Task.module.scss';

const constTitle = 'Task';

export const Task = () => {
  const [title, setTitle] = useState(constTitle);
  return (
    <>
      <label>
        <input
          className={styles.title}
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </label>
    </>
  );
};
