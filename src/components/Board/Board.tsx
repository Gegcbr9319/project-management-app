import React, { useState, useCallback, useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import { ArrowBackIosNew, Add, Delete, Edit } from '@mui/icons-material';
import { Column, Loader, ModalColumns, ModalBoard, BoardContext, BoardState } from 'components';
import { useNavigate } from 'react-router';
import styles from './Board.module.scss';
import { setDeleteCallback, useDeleteBoardByIdMutation } from 'store';
import { useDispatch } from 'react-redux';
import { DeleteCallback, IColumn } from 'models';

export const Board = () => {
  const [board] = useContext(BoardContext) as BoardState;

  const boardId = board?._id ?? '';
  const columns = board?.columns ?? [];
  const isBoardLoading = board?.isBoardLoading;
  const areColumnsLoading = board?.areColumnsLoading;

  const [callingForm, setCallingForm] = useState(false);
  const dispatch = useDispatch();
  const [deleteBoard] = useDeleteBoardByIdMutation();
  const navigate = useNavigate();
  const [type, setType] = useState('');

  const columnsAdd = () => {
    setType('column');
    setCallingForm(true);
  };

  const boardEditHandler = () => {
    setType('board');
    setCallingForm(true);
  };

  const backHandler = () => {
    navigate('/' + location.pathname.split('/')[1]);
  };

  const deleteCallback: DeleteCallback = useCallback(async () => {
    await deleteBoard({ boardId });
    navigate('/boards');
  }, [boardId, deleteBoard, navigate]);

  const buttonDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDeleteCallback(deleteCallback));
  };

  return (
    <>
      {(isBoardLoading || areColumnsLoading) && <Loader />}
      <div className={styles.board}>
        {board && (
          <div className={styles.boardDescription}>
            <div className={styles.boardEdit}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIosNew />}
                onClick={backHandler}
                size="small"
                color="warning"
                className={styles.buttonBig}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={columnsAdd}
                size="small"
                color="info"
                className={styles.buttonBig}
                disabled={areColumnsLoading}
              >
                Column
              </Button>
            </div>
            <div className={styles.boardInfo}>
              <h2>{board.title}</h2>
              <h3>{board.description ? board.description : <span>Description is empty</span>}</h3>
            </div>
            <div className={styles.editButton}>
              <IconButton
                className={styles.button}
                color="warning"
                size="small"
                onClick={buttonDeleteHandler}
              >
                <Delete />
              </IconButton>
              <IconButton
                className={styles.button}
                color="info"
                size="small"
                onClick={boardEditHandler}
              >
                <Edit />
              </IconButton>
            </div>
          </div>
        )}
        <div className={styles.columns}>
          <div className={styles.column}>
            {columns.map(({ _id, title }: IColumn) => {
              return <Column key={_id} columnId={_id} title={title} boardId={boardId} />;
            })}
          </div>
        </div>
      </div>
      {callingForm && type === 'column' && (
        <ModalColumns type="create column" setCallingForm={setCallingForm} boardId={boardId} />
      )}
      {callingForm && type === 'board' && (
        <ModalBoard
          type="edit board"
          setCallingForm={setCallingForm}
          boardId={boardId}
          users={board?.users || ['']}
          owner={board?.owner || ''}
          titleEdit={board?.title || ''}
          descriptionEdit={board?.description || ''}
        />
      )}
    </>
  );
};
