import React, { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import styles from './Column.module.scss';
import { Loader, Modal, Task } from 'components';
import { useGetTasksInColumnQuery } from 'store';

interface IColumnProps {
  id: string;
  title: string;
  boardId: string;
}

export const Column: FC<IColumnProps> = ({ id, title, boardId }) => {
  const [callingForm, setCallingForm] = useState(false);
  const { data, isLoading } = useGetTasksInColumnQuery({ boardId: boardId, columnId: id });

  const tasksAdd = () => {
    setCallingForm(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.column}>
        <div className={styles.button}>
          <IconButton color="warning">
            <Delete />
          </IconButton>
          <h3 className={styles.h3}>{title}</h3>
          <IconButton color="info" size="small">
            <Edit />
          </IconButton>
        </div>
        <div className={styles.tasks}>
          {data?.map((index) => {
            return (
              <Task
                key={index._id}
                title={index.title}
                description={index.description}
                taskId={index._id}
              />
            );
          })}
        </div>
        <IconButton color="info" onClick={tasksAdd} size="large">
          <AddCircle />
        </IconButton>
      </div>
      {callingForm && (
        <Modal type="create task" setCallingForm={setCallingForm} _id={boardId} columnId={id} />
      )}
    </>
  );
};
