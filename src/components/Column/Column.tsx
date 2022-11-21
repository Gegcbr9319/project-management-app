import React, { useState } from 'react';
import styles from './Column.module.scss';
import { Task } from '../index';

const constTitle = 'This is column name';

export const Column = () => {
  const [title, setTitle] = useState(constTitle);
  const [tasksCount, setTasksCount] = useState(0);
  const [tasksArray, setTasksArray] = useState<number[]>([]);

  const tasksAdd = () => {
    setTasksCount(tasksCount + 1);
    setTasksArray([...tasksArray, tasksCount]);
  };

  return (
    <>
      <div>
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
        <button className={styles.button} onClick={tasksAdd}>
          Add task
        </button>
        <div className={styles.tasks}>
          {tasksArray?.map((index) => {
            return <Task key={tasksArray[index]} />;
          })}
        </div>
      </div>
    </>
  );
};
