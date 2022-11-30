import React, { FC, useCallback, useState } from 'react';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import styles from './Column.module.scss';
import { Loader, ModalColumns, Task } from 'components';
import { ModalTasks } from 'components/Modal/ModalTasks/ModalTasks';
import { setDeleteCallback, useDeleteColumnByIdMutation, useGetTasksInColumnQuery } from 'store';
import { DeleteCallback } from 'models';

interface IColumnProps {
  columnId: string;
  title: string;
  boardId: string;
}

export const Column: FC<IColumnProps> = ({ columnId, title, boardId }) => {
  const dispatch = useDispatch();
  const [callingForm, setCallingForm] = useState(false);
  const [type, setType] = useState('');
  const { data, isLoading } = useGetTasksInColumnQuery({ boardId: boardId, columnId: columnId });
  const [deleteColumn, deleteColumnResults] = useDeleteColumnByIdMutation();

  const tasksAdd = () => {
    setType('create task');

    setCallingForm(true);
  };

  const columnEdit = () => {
    setType('edit column');

    setCallingForm(true);
  };

  const deleteCallback: DeleteCallback = useCallback(
    async () => await deleteColumn({ boardId, columnId }),
    [boardId, columnId, deleteColumn]
  );

  const buttonDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDeleteCallback(deleteCallback));
  };

  return (
    <>
      {(isLoading || deleteColumnResults.isLoading) && <Loader />}
      <div className={styles.column}>
        <div className={styles.button}>
          <IconButton color="warning" onClick={buttonDeleteHandler}>
            <Delete />
          </IconButton>
          <h3 className={styles.h3}>{title}</h3>
          <IconButton color="info" size="small" onClick={columnEdit}>
            <Edit />
          </IconButton>
        </div>
        <div className={styles.tasks}>
          {data
            ?.map((index) => index)
            .sort((a, b) => a.order - b.order)
            .map((index) => {
              return (
                <Task
                  key={index._id}
                  title={index.title}
                  description={index.description}
                  taskId={index._id}
                  boardId={boardId}
                  columnId={columnId}
                />
              );
            })}
        </div>
        <IconButton color="info" onClick={tasksAdd} size="large">
          <AddCircle />
        </IconButton>
      </div>
      {callingForm && type === 'edit column' && (
        <ModalColumns
          type="edit column"
          setCallingForm={setCallingForm}
          boardId={boardId}
          columnId={columnId}
        />
      )}
      {callingForm && type === 'create task' && (
        <ModalTasks
          type="create task"
          setCallingForm={setCallingForm}
          boardId={boardId}
          columnId={columnId}
        />
      )}
    </>
  );
};
