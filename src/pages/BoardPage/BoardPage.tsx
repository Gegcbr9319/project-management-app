import React, { useState, useCallback } from 'react';
import { Button, IconButton } from '@mui/material';
import { ArrowBackIosNew, Add, Delete, Edit } from '@mui/icons-material';
import { Column, Loader, ModalColumns, ModalBoard } from 'components';
import { useNavigate } from 'react-router';
import styles from './BoardPage.module.scss';
import {
  setDeleteCallback,
  useDeleteBoardByIdMutation,
  useGetBoardByIdQuery,
  useGetColumnsInBoardQuery,
} from 'store';
import { useDispatch } from 'react-redux';
import { DeleteCallback } from 'models';

export const BoardPage = () => {
  const [callingForm, setCallingForm] = useState(false);
  const dispatch = useDispatch();
  const [deleteBoard] = useDeleteBoardByIdMutation();
  const boardId = location.pathname.split('/').reverse()[0];
  const navigate = useNavigate();
  const { data, isLoading } = useGetBoardByIdQuery({ boardId });
  const columns = useGetColumnsInBoardQuery({ boardId });
  const [type, setType] = useState('');
  const [showDescription, setShowDescription] = useState(false);

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
      {(isLoading || columns.isLoading) && <Loader />}
      <div className={styles.board}>
        {data && (
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
                disabled={columns.isLoading}
              >
                Column
              </Button>
            </div>
            <div className={styles.boardInfo}>
              <h2>{data.title}</h2>
              <h3
                onClick={() => setShowDescription((prev) => !prev)}
                className={showDescription ? styles.showDesription : ''}
              >
                {data.description}
              </h3>
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

        {columns?.data?.length !== 0 && <h3> Columns </h3>}
        <div className={styles.columns}>
          <div className={styles.column}>
            {columns?.data
              ?.map((index) => index)
              .sort((a, b) => a.order - b.order)
              .map((index) => {
                return (
                  <Column
                    key={index._id}
                    columnId={index._id}
                    title={index.title}
                    boardId={boardId}
                  />
                );
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
          users={data ? data.users : ['']}
          owner={data ? data.owner : ''}
          titleEdit={data ? data.title : ''}
          descriptionEdit={data ? data.description : ''}
        />
      )}
    </>
  );
};
