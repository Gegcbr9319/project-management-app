import React from 'react';
import { useSelector } from 'react-redux';
import { IStore, useCreateBoardMutation, useGetBoardsSetByUserIdQuery } from 'store';
import { Board } from 'components';
import styles from './BoardsPage.module.scss';

export const BoardsPage = () => {
  const { token } = useSelector((store: IStore) => store);
  const {
    data = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetBoardsSetByUserIdQuery({
    token,
    userId: token.decoded?.id ? token.decoded.id : '',
  });
  const [createBoard] = useCreateBoardMutation();

  const boardsAdd = () => {
    createBoard({
      token,
      body: {
        title: 'New board title',
        description: 'Очень странная доска',
        owner: token.decoded?.id ? token.decoded.id : '',
        users: [],
      },
    });
  };
  return (
    <>
      <h2>Boards</h2>
      <button className={styles.button} onClick={boardsAdd} disabled={isLoading}>
        Add Board
      </button>
      <div className={styles.boards}>
        {data?.map((board) => {
          return <Board key={board._id} />;
        })}
      </div>

      <br />
      <div>
        <p>{`isLoading: ${isLoading}`}</p>
        <p>{`isSuccess: ${isSuccess}`}</p>
        <p>{`isError:   ${isError}`}</p>
        <p>{`data: ${JSON.stringify(data)}`}</p>
      </div>
    </>
  );
};
