import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { Board } from 'components';
import styles from './BoardsPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBoardsSetByUserIdQuery, useCreateBoardMutation } from 'api';

export const BoardsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((state: AppState) => state);
  const userId = auth.isAuthenticated ? auth.user._id : '';

  const { data = [], isLoading, isError, isSuccess } = useGetBoardsSetByUserIdQuery(userId);
  const [createBoard] = useCreateBoardMutation();

  const boardsAdd = () => {
    createBoard({
      body: {
        title: 'New board title',
        description: 'Очень странная доска',
        owner: userId,
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
          return (
            <button key={board._id} onClick={() => navigate(location.pathname + '/' + board._id)}>
              <Board />
            </button>
          );
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
