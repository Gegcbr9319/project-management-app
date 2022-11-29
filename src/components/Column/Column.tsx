import React, { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
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
      <div>
        <h3>{title}</h3>
        <div className={styles.tasks}>
          {data?.map((index) => {
            return <Task key={index._id} title={index.title} description={index.description} />;
          })}
        </div>
        <IconButton color="info" aria-label="add an alarm" onClick={tasksAdd}>
          <AddCircle />
        </IconButton>
      </div>
      {callingForm && (
        <Modal type="create task" setCallingForm={setCallingForm} _id={boardId} columnId={id} />
      )}
    </>
  );
};
