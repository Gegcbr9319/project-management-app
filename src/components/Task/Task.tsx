import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import styles from './Task.module.scss';

interface ITaskProps {
  title: string;
  description: string;
  taskId: string;
}

export const Task: FC<ITaskProps> = ({ title, description, taskId }) => {
  return (
    <>
      <div className={styles.task}>
        <IconButton className={styles.button} color="warning" size="small">
          <Delete />
        </IconButton>
        <h3>{title}</h3>
        <IconButton className={styles.button} color="info" size="small">
          <Edit />
        </IconButton>

        {/* <h4>{description}</h4> */}
      </div>
    </>
  );
};
