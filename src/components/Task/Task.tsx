import React, { FC, useState, useCallback } from 'react';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import styles from './Task.module.scss';
import { ModalTasks } from 'components/Modal/ModalTasks/ModalTasks';
import { useDispatch } from 'react-redux';
import { setDeleteCallback, useDeleteTaskByIdMutation } from 'store';
import { Loader } from 'components';
import { DeleteCallback } from 'models';

interface ITaskProps {
  title: string;
  description: string;
  taskId: string;
  boardId: string;
  columnId: string;
}

export const Task: FC<ITaskProps> = ({ title, description, taskId, boardId, columnId }) => {
  const [callingForm, setCallingForm] = useState(false);
  const dispatch = useDispatch();
  const [deleteTask, { isLoading }] = useDeleteTaskByIdMutation();

  const editTask = () => {
    setCallingForm(true);
  };

  const deleteCallback: DeleteCallback = useCallback(
    async () => await deleteTask({ boardId, columnId, taskId }),
    [boardId, columnId, taskId, deleteTask]
  );

  const buttonDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDeleteCallback(deleteCallback));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.task}>
        <div>
          <h3>{title}</h3>
          <h4>{description}</h4>
        </div>
        <div>
          <IconButton className={styles.button} color="info" size="small" onClick={editTask}>
            <Edit />
          </IconButton>
          <IconButton
            className={styles.button}
            color="warning"
            size="small"
            onClick={buttonDeleteHandler}
          >
            <Delete />
          </IconButton>
        </div>
      </div>
      {callingForm && (
        <ModalTasks
          type="edit task"
          setCallingForm={setCallingForm}
          taskId={taskId}
          boardId={boardId}
          columnId={columnId}
          titleEdit={title}
          descriptionEdit={description}
        />
      )}
    </>
  );
};
