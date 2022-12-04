import React, { MouseEvent, useState, useCallback } from 'react';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import styles from './Task.module.scss';
import { ModalTasks } from 'components/Modal/ModalTasks/ModalTasks';
import { useDispatch } from 'react-redux';
import { setDeleteCallback, useDeleteTaskByIdMutation } from 'store';
import { Loader } from 'components';
import { DeleteCallback, ITask } from 'models';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

interface TaskProps {
  task: ITask;
}

export function Task({ task }: TaskProps): JSX.Element {
  const { _id: taskId, columnId, boardId, order, title, description } = task;

  const [callingForm, setCallingForm] = useState(false);
  const dispatch = useDispatch();
  const [deleteTask, { isLoading }] = useDeleteTaskByIdMutation();

  const handleEditTask = () => {
    setCallingForm(true);
  };

  const deleteTaskCallback: DeleteCallback = useCallback(
    async () => await deleteTask({ boardId, columnId, taskId }),
    [boardId, columnId, taskId, deleteTask]
  );

  const handleDeleteTask = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDeleteCallback(deleteTaskCallback));
  };

  return (
    <>
      {isLoading && <Loader />}
      <Draggable draggableId={taskId} index={order}>
        {({ draggableProps, dragHandleProps, innerRef }: DraggableProvided) => (
          <div className={styles.task} {...draggableProps} {...dragHandleProps} ref={innerRef}>
            <div>
              <h3>{title}</h3>
              <p>{description ? description : 'Description is empty'}</p>
            </div>
            <div>
              <IconButton
                className={styles.button}
                color="warning"
                size="small"
                onClick={handleDeleteTask}
              >
                <Delete />
              </IconButton>
              <IconButton
                className={styles.button}
                color="info"
                size="small"
                onClick={handleEditTask}
              >
                <Edit />
              </IconButton>
            </div>
          </div>
        )}
      </Draggable>
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
}
