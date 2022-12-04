import React, { FC, useCallback, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AddCircle, Delete, Close, Send } from '@mui/icons-material';
import styles from './Column.module.scss';
import { Loader, ModalColumns, Task } from 'components';
import { ModalTasks } from 'components/Modal/ModalTasks/ModalTasks';
import {
  setDeleteCallback,
  useDeleteColumnByIdMutation,
  useGetColumnsInBoardQuery,
  useGetTasksInColumnQuery,
  useUpdateColumnByIdMutation,
} from 'store';
import { DeleteCallback, ITask } from 'models';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

interface IColumnProps {
  columnId: string;
  title: string;
  boardId: string;
}

export const Column: FC<IColumnProps> = ({ columnId, title, boardId }) => {
  const dispatch = useDispatch();
  const [callingForm, setCallingForm] = useState(false);
  const [type, setType] = useState('');
  const { data: tasks, isLoading: areTasksLoading } = useGetTasksInColumnQuery({
    boardId: boardId,
    columnId: columnId,
  });
  const [deleteColumn, deleteColumnResults] = useDeleteColumnByIdMutation();
  const [inputColunm, setInputColumn] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [updateColumn, updateColumnResults] = useUpdateColumnByIdMutation();
  const columns = useGetColumnsInBoardQuery({ boardId });

  const inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const tasksAdd = () => {
    setType('create task');

    setCallingForm(true);
  };

  const columnEdit = async () => {
    await updateColumn({
      boardId: boardId,
      columnId: columnId,
      body: {
        title: inputValue,
        order:
          columns && columns.data
            ? columns.data.filter((column) => column._id === columnId)[0].order
            : 0,
      },
    });
    setInputColumn(false);
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
      {(areTasksLoading || deleteColumnResults.isLoading || updateColumnResults.isLoading) && (
        <Loader />
      )}
      <div className={styles.column}>
        <div className={styles.button}>
          {!inputColunm && (
            <>
              <button className={styles.h3} onClick={() => setInputColumn(true)}>
                {title}
              </button>
              <IconButton color="warning" onClick={buttonDeleteHandler}>
                <Delete />
              </IconButton>
            </>
          )}
          {inputColunm && (
            <div className={styles.editInput}>
              <TextField
                className={styles.inputTitle}
                id="outlined-basic"
                autoFocus
                size="small"
                variant="outlined"
                value={inputValue}
                multiline={false}
                onChange={inputHandler}
              />
              <div className={styles.inputButton}>
                <IconButton
                  className={styles.iconButton}
                  color="warning"
                  size="small"
                  onClick={() => setInputColumn(false)}
                >
                  <Close />
                </IconButton>
                <IconButton
                  className={styles.iconButton}
                  color="info"
                  size="small"
                  onClick={columnEdit}
                  disabled={inputValue.length < 3}
                >
                  <Send />
                </IconButton>
              </div>
            </div>
          )}
        </div>
        {tasks?.length !== 0 && (
          <Droppable droppableId={columnId}>
            {({ droppableProps, innerRef, placeholder }: DroppableProvided) => (
              <div className={styles.tasks} {...droppableProps} ref={innerRef}>
                {tasks
                  ?.map((task) => task)
                  .sort((task1, task2) => task1.order - task2.order)
                  .map(({ _id, title, description }: ITask, index) => {
                    return (
                      <Task
                        key={_id}
                        title={title}
                        description={description}
                        taskId={_id}
                        boardId={boardId}
                        columnId={columnId}
                        order={index}
                      />
                    );
                  })}
                {placeholder}
              </div>
            )}
          </Droppable>
        )}
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
          titleEdit={title}
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
