import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { Board, Loader } from 'components';
import styles from './BoardsPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBoardsSetByUserIdQuery, useCreateBoardMutation } from 'store';
import { AuthState } from 'models';

export const BoardsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector(({ auth }: AppState): AuthState => auth);
  const userId = token?.decoded?.id || '';

  const { data = [], isLoading } = useGetBoardsSetByUserIdQuery(userId);
  const [createBoard, createBoardResult] = useCreateBoardMutation();

  const boardsAdd = () => {
    createBoard({
      body: {
        title: 'New board title',
        description: 'Очень странная доска',
        owner: userId || '',
        users: [],
      },
    });
  };

  return (
    <>
      {(isLoading || createBoardResult.isLoading) && <Loader />}
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
    </>
  );
};
