import React, { useState } from 'react';
import { Board } from '../../components';
import styles from './BoardsPage.module.scss';

export const BoardsPage = () => {
  const [boardsCount, setBoardsCount] = useState(0);
  const [boardsArray, setBoardsArray] = useState<number[]>([]);

  const boardsAdd = () => {
    setBoardsCount(boardsCount + 1);
    setBoardsArray([...boardsArray, boardsCount]);
  };
  console.log(boardsCount);
  console.log(boardsArray);
  return (
    <>
      <h2>Boards</h2>
      <button className={styles.button} onClick={boardsAdd}>
        Add Board
      </button>
      <div className={styles.boards}>
        {boardsArray?.map((index) => {
          return <Board key={boardsArray[index]} />;
        })}
      </div>
    </>
  );
};
