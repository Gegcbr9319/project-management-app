import React, { MouseEvent, useState, useCallback, useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import { ArrowBackIosNew, Add, Delete, Edit } from '@mui/icons-material';
import { Column, Loader, ModalColumns, ModalBoard, BoardContext, BoardState } from 'components';
import { useNavigate } from 'react-router';
import styles from './Board.module.scss';
import {
  AppState,
  setDeleteCallback,
  useDeleteBoardByIdMutation,
  useGetBoardByIdQuery,
} from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, DeleteCallback } from 'models';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

export const Board = (): JSX.Element => {
  const [board] = useContext(BoardContext) as BoardState;

  const boardId = board?._id ?? '';
  const columns = board?.columns ?? [];
  const isBoardLoading = board?.isBoardLoading;
  const areColumnsLoading = board?.areColumnsLoading;

  const [callingForm, setCallingForm] = useState(false);
  const dispatch = useDispatch();
  const [deleteBoard] = useDeleteBoardByIdMutation();
  const navigate = useNavigate();
  const { data } = useGetBoardByIdQuery({ boardId });
  const [type, setType] = useState('');
  const { token } = useSelector(({ auth }: AppState): AuthState => auth);

  const handleCreateColumn = () => {
    setType('column');
    setCallingForm(true);
  };

  const handleEditBoard = () => {
    setType('board');
    setCallingForm(true);
  };

  const handleBack = () => {
    navigate('/' + location.pathname.split('/')[1]);
  };

  const deleteBoardCallback: DeleteCallback = useCallback(async () => {
    await deleteBoard({ boardId });
    navigate('/boards');
  }, [boardId, deleteBoard, navigate]);

  const handleDeleteBoard = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDeleteCallback(deleteBoardCallback));
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
                onClick={handleBack}
                size="small"
                color="warning"
                className={styles.buttonBig}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleCreateColumn}
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
                onClick={handleDeleteBoard}
                disabled={data?.owner !== token?.decoded?.id}
              >
                <Delete />
              </IconButton>
              <IconButton
                className={styles.button}
                color="info"
                size="small"
                onClick={handleEditBoard}
              >
                <Edit />
              </IconButton>
            </div>
          </div>
        )}
        <Droppable droppableId={boardId || 'board'} direction="horizontal" type="column">
          {({ droppableProps, innerRef, placeholder }: DroppableProvided) => (
            <div className={styles.columns}>
              <div className={styles.column} {...droppableProps} ref={innerRef}>
                {columns.map((column) => {
                  return <Column key={column._id} column={column} />;
                })}
                {placeholder}
              </div>
            </div>
          )}
        </Droppable>
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
