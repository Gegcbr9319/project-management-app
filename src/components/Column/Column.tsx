import React, { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import styles from './Column.module.scss';
import { Task } from 'components';
import { useGetTasksInColumnQuery } from 'store';

interface IColumnProps {
  id: string;
  title: string;
  boardId: string;
}

export const Column: FC<IColumnProps> = ({ id, title, boardId }) => {
  const { data, isLoading } = useGetTasksInColumnQuery({ boardId: boardId, columnId: id });
  const [tasksCount, setTasksCount] = useState(0);
  const [tasksArray, setTasksArray] = useState<number[]>([]);

  const tasksAdd = () => {
    console.log(data);
    setTasksCount(tasksCount + 1);
    setTasksArray([...tasksArray, tasksCount]);
  };

  return (
    <>
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
    </>
  );
};
