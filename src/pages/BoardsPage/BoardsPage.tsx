import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { AppState, useGetBoardsSetByUserIdQuery } from 'store';
import { BoardPreview, Modal } from 'components';
import styles from './BoardsPage.module.scss';
import { AuthState } from 'models';

export const BoardsPage = () => {
  const { token } = useSelector(({ auth }: AppState): AuthState => auth);
  const [callingForm, setCallingForm] = useState(false);
  const {
    data = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetBoardsSetByUserIdQuery(token?.decoded?.id ? token.decoded.id : '');

  const formsCalling = () => {
    setCallingForm(true);
  };

  return (
    <>
      <h2>Boards</h2>
      <div className={styles.boards}>
        {data?.map((board) => {
          return <BoardPreview key={board._id} {...board} />;
        })}
        <Button
          variant="outlined"
          startIcon={<AddCircle />}
          onClick={formsCalling}
          disabled={isLoading}
          size="large"
          color="warning"
          className={styles.button}
        >
          Add Board
        </Button>
      </div>
      {callingForm && <Modal type="create board" setCallingForm={setCallingForm} />}

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
