import React, { useState } from 'react';
import styles from './Board.module.scss';
import { Column } from 'components';

const constTitle = 'This is board name';
const constDescription = 'This is board description';

export const Board = () => {
  const [title, setTitle] = useState(constTitle);
  const [description, setDescription] = useState(constDescription);
  const [columnsCount, setColumnsCount] = useState(0);
  const [columnsArray, setColumnsArray] = useState<number[]>([]);

  const columnsAdd = () => {
    setColumnsCount(columnsCount + 1);
    setColumnsArray([...columnsArray, columnsCount]);
  };

  return (
    <>
      <div className={styles.board}>
        <label>
          <input
            type="text"
            className={styles.title}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </label>
        <label>
          <input
            type="text"
            className={styles.description}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </label>
        {columnsCount !== 0 && <h3> Columns </h3>}
        <div className={styles.columns}>
          {columnsArray?.map((index) => {
            return <Column key={columnsArray[index]} />;
          })}
        </div>
        <button className={styles.button} onClick={columnsAdd}>
          Add Column
        </button>
      </div>
    </>
  );
};
