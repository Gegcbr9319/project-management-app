import React, { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AddCircle, Delete, Close, Send } from '@mui/icons-material';
import styles from './Column.module.scss';
import { Loader, ModalColumns, SortedColumn, Task } from 'components';
import { ModalTasks } from 'components/Modal/ModalTasks/ModalTasks';
import {
  setDeleteCallback,
  useDeleteColumnByIdMutation,
  useUpdateBoardByIdMutation,
  useUpdateColumnByIdMutation,
  useGetBoardByIdQuery,
  useGetTaskSetByBoardIdQuery,
} from 'store';
import { DeleteCallback } from 'models';
import { Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd';

interface ColumnProps {
  column: SortedColumn;
}

export function Column({ column }: ColumnProps): JSX.Element {
  const { _id: columnId, boardId, title, order, tasks } = column;

  const dispatch = useDispatch();
  const [callingForm, setCallingForm] = useState(false);
  const [type, setType] = useState('');
  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const tasksBoard = useGetTaskSetByBoardIdQuery({ boardId });
  const [updateBoard] = useUpdateBoardByIdMutation();
  const board = useGetBoardByIdQuery({ boardId });
  const [updateColumn, updateColumnResults] = useUpdateColumnByIdMutation();
  const [deleteColumn, deleteColumnResults] = useDeleteColumnByIdMutation();

  const usersTasks = tasksBoard.data?.filter((task) => task.columnId !== columnId) || [];
  const boardUsers = usersTasks.reduce((accumulator, currentValue) => {
    currentValue.users.forEach((userId: string) => accumulator.add(userId));
    return accumulator;
  }, new Set<string>());

  const handleChangeTitle = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleCreateTask = () => {
    setType('create task');
    setCallingForm(true);
  };

  const handleEditColumn = async () => {
    await updateColumn({
      boardId: boardId,
      columnId: columnId,
      body: {
        title: newTitle,
        order,
      },
    });
    setEditable(false);
  };

  const deleteColumnCallback: DeleteCallback = useCallback(async () => {
    await deleteColumn({ boardId, columnId });
    await updateBoard({
      boardId: boardId,
      body: {
        title: board.data ? board.data.title : '',
        description: board.data ? board.data.description : '',
        owner: board.data ? board.data.owner : '',
        users: [...boardUsers],
      },
    });
  }, [board.data, boardId, boardUsers, columnId, deleteColumn, updateBoard]);

  const handleDeleteColumn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDeleteCallback(deleteColumnCallback));
  };

  return (
    <>
      {(deleteColumnResults.isLoading || updateColumnResults.isLoading) && <Loader />}
      <Draggable draggableId={columnId} index={order}>
        {({ draggableProps, dragHandleProps, innerRef }: DraggableProvided) => (
          <div className={styles.column} {...draggableProps} {...dragHandleProps} ref={innerRef}>
            <div className={styles.button}>
              {!editable && (
                <>
                  <button className={styles.h3} onClick={() => setEditable(true)}>
                    {title}
                  </button>
                  <IconButton color="warning" onClick={handleDeleteColumn}>
                    <Delete />
                  </IconButton>
                </>
              )}
              {editable && (
                <div className={styles.editInput}>
                  <TextField
                    className={styles.inputTitle}
                    id="column-title"
                    autoFocus
                    size="small"
                    variant="outlined"
                    value={newTitle}
                    multiline={false}
                    onChange={handleChangeTitle}
                  />
                  <div className={styles.inputButton}>
                    <IconButton
                      className={styles.iconButton}
                      color="warning"
                      size="small"
                      onClick={() => setEditable(false)}
                    >
                      <Close />
                    </IconButton>
                    <IconButton
                      className={styles.iconButton}
                      color="info"
                      size="small"
                      onClick={handleEditColumn}
                      disabled={newTitle.length < 3}
                    >
                      <Send />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
            <Droppable droppableId={columnId} direction="vertical" type="task">
              {({ droppableProps, innerRef, placeholder }: DroppableProvided) => (
                <div className={styles.tasks} {...droppableProps} ref={innerRef}>
                  {tasks.map((task) => (
                    <Task key={task._id} task={task} />
                  ))}
                  {placeholder}
                </div>
              )}
            </Droppable>
            <IconButton color="info" onClick={handleCreateTask} size="large">
              <AddCircle />
            </IconButton>
          </div>
        )}
      </Draggable>
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
}
