import React, { useState, useCallback } from 'react';
import { Button, IconButton } from '@mui/material';
import { ArrowBackIosNew, Add, Delete, Edit } from '@mui/icons-material';
import { Column, Loader, ModalColumns, ModalBoard } from 'components';
import { useNavigate, useParams } from 'react-router';
import styles from './BoardPage.module.scss';
import {
  setDeleteCallback,
  useDeleteBoardByIdMutation,
  useUpdateTasksSetMutation,
  useGetBoardByIdQuery,
  useGetColumnsInBoardQuery,
  useGetTaskSetByBoardIdQuery,
} from 'store';
import { useDispatch } from 'react-redux';
import { DeleteCallback, IColumn, ITask } from 'models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const BoardPage = () => {
  const [callingForm, setCallingForm] = useState(false);
  const dispatch = useDispatch();
  const [deleteBoard] = useDeleteBoardByIdMutation();
  const [updateTasksSet] = useUpdateTasksSetMutation();
  const boardId = useParams()?.id || '';
  const navigate = useNavigate();
  const { data: board, isLoading: isBoardLoading } = useGetBoardByIdQuery({ boardId });
  const { data: columns, isLoading: areColumnsLoading } = useGetColumnsInBoardQuery({ boardId });
  const { data: tasks, isLoading: areTasksLoading } = useGetTaskSetByBoardIdQuery({ boardId });
  const [type, setType] = useState('');

  const columnsAdd = () => {
    setType('column');
    setCallingForm(true);
  };

  const boardEditHandler = () => {
    setType('board');
    setCallingForm(true);
  };

  const backHandler = () => {
    navigate('/' + location.pathname.split('/')[1]);
  };

  const deleteCallback: DeleteCallback = useCallback(async () => {
    await deleteBoard({ boardId });
    navigate('/boards');
  }, [boardId, deleteBoard, navigate]);

  const buttonDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDeleteCallback(deleteCallback));
  };

  const handleDragEnd = async ({ draggableId, source, destination }: DropResult): Promise<void> => {
    // dropped outside any valid droppable
    if (!destination) {
      return;
    }

    // dragged within the same column
    if (destination.droppableId === source.droppableId) {
      // dropped where drag started
      if (destination.index === source.index) {
        return;
      }

      // tasks order changed
      const tasksOrder: ITask[] =
        tasks
          ?.filter((task) => task.columnId === destination.droppableId)
          .sort((task1, task2) => task1.order - task2.order) || [];
      console.log(JSON.stringify(tasksOrder));
      const draggedTask = tasksOrder.splice(source.index, 1)[0];
      console.log(draggedTask, source.index, destination.index);
      console.log(JSON.stringify(tasksOrder));
      tasksOrder.splice(destination.index, 0, draggedTask);
      console.log(JSON.stringify(tasksOrder));

      const updatedTasksSet = tasksOrder.map(({ _id, columnId }: ITask, index) => ({
        _id,
        order: index,
        columnId,
      }));
      console.log(JSON.stringify(updatedTasksSet));

      await updateTasksSet({
        body: updatedTasksSet,
      }).unwrap();
    }
  };

  return (
    <>
      {(isBoardLoading || areColumnsLoading) && <Loader />}
      <div className={styles.board}>
        {board && (
          <div className={styles.boardDescription}>
            <div className={styles.boardEdit}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIosNew />}
                onClick={backHandler}
                size="small"
                color="warning"
                className={styles.buttonBig}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={columnsAdd}
                size="small"
                color="info"
                className={styles.buttonBig}
                disabled={areColumnsLoading}
              >
                Column
              </Button>
            </div>
            <div className={styles.boardInfo}>
              <h2>{board.title}</h2>
              <h3>{board.description ? board.description : <span>Description is empty</span>}</h3>
            </div>
            <div className={styles.editButton}>
              <IconButton
                className={styles.button}
                color="warning"
                size="small"
                onClick={buttonDeleteHandler}
              >
                <Delete />
              </IconButton>
              <IconButton
                className={styles.button}
                color="info"
                size="small"
                onClick={boardEditHandler}
              >
                <Edit />
              </IconButton>
            </div>
          </div>
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.columns}>
            <div className={styles.column}>
              {columns
                ?.map((column) => column)
                .sort((column1, column2) => column1.order - column2.order)
                .map(({ _id, title }: IColumn) => {
                  return <Column key={_id} columnId={_id} title={title} boardId={boardId} />;
                })}
            </div>
          </div>
        </DragDropContext>
      </div>
      {callingForm && type === 'column' && (
        <ModalColumns type="create column" setCallingForm={setCallingForm} boardId={boardId} />
      )}
      {callingForm && type === 'board' && (
        <ModalBoard
          type="edit board"
          setCallingForm={setCallingForm}
          boardId={boardId}
          users={board?.users || ['']}
          owner={board?.owner || ''}
          titleEdit={board?.title || ''}
          descriptionEdit={board?.description || ''}
        />
      )}
    </>
  );
};
