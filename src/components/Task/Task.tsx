import React, { FC } from 'react';
import styles from './Task.module.scss';

interface ITaskProps {
  title: string;
  description: string;
}

export const Task: FC<ITaskProps> = ({ title, description }) => {
  return (
    <>
      <h3>{title}</h3>
      {/* <h4>{description}</h4> */}
    </>
  );
};
