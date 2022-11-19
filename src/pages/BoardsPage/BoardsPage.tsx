import React, { useState } from 'react';
import { Board } from '../../components';
import styles from './BoardsPage.module.scss';

export const BoardsPage = () => {
  const [boardsCount, setBoardsCount] = useState(0);
  const [boardArray, setBoardArray] = useState<number[]>([]);
  const boardAdd = () => {
    setBoardsCount(boardsCount + 1);
    setBoardArray([...boardArray, boardsCount]);
  };
  console.log(boardsCount);
  console.log(boardArray);
  return (
    <>
      <h2>Boards</h2>
      <button className={styles.button} onClick={boardAdd}>
        Add Board
      </button>
      <div>
        {boardArray?.map((index) => {
          return <Board key={index} />;
        })}
        <Board />
      </div>
    </>
  );
};
