import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { AppState, useGetBoardsSetByUserIdQuery } from 'store';
import { BoardPreview, ModalBoard, Loader } from 'components';
import styles from './BoardsPage.module.scss';
import { AuthState } from 'models';

export const BoardsPage = () => {
  const { token } = useSelector(({ auth }: AppState): AuthState => auth);
  const [callingForm, setCallingForm] = useState(false);
  const userId = token?.decoded?.id || '';
  const { data = [], isLoading } = useGetBoardsSetByUserIdQuery(userId);

  const formsCalling = () => {
    setCallingForm(true);
  };

  return (
    <div className={styles.pageWrapper}>
      {isLoading && <Loader />}
      <h2>Boards</h2>
      <div className={styles.boards}>
        {data?.map((board) => {
          return <BoardPreview key={board._id} {...board} />;
        })}
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={formsCalling}
          disabled={isLoading}
          size="large"
          color="inherit"
          className={styles.button}
        >
          Add Board
        </Button>
      </div>
      {callingForm && <ModalBoard type="create board" setCallingForm={setCallingForm} />}
    </div>
  );
};
