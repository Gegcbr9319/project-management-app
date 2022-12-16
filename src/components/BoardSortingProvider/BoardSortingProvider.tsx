import { BoardState } from 'components/BoardContextProvider';
import { IBoard, IColumn, ITask } from 'models';
import React, { PropsWithChildren, useContext } from 'react';
import { DropResult, DragDropContext } from 'react-beautiful-dnd';
import { useUpdateColumnsSetMutation, useUpdateTasksSetMutation } from 'store';
import { BoardContext } from 'components';

export interface SortedBoard extends IBoard {
  columns: SortedColumn[];
  isBoardLoading: boolean;
  areColumnsLoading: boolean;
  areTasksLoading: boolean;
}

export interface SortedColumn extends IColumn {
  tasks: ITask[];
}

interface Orderable {
  order: number;
}

export const byOrder = (item1: Orderable, item2: Orderable) => item1.order - item2.order;

export function BoardSortingProvider({ children }: PropsWithChildren): JSX.Element {
  const [boardState, setBoardState] = useContext(BoardContext) as BoardState;
  const [updateColumnsSet] = useUpdateColumnsSetMutation();
  const [updateTasksSet] = useUpdateTasksSetMutation();

  const handleDragEnd = async ({ source, destination, type }: DropResult): Promise<void> => {
    // nothing to work with yet
    if (!boardState) {
      return;
    }

    const { columns } = boardState;

    // dropped outside any valid droppable
    if (!destination) {
      return;
    }

    // dropped where drag started
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // dragged a column
    if (type === 'column') {
      // rearrange columns order
      const sortedColumns: SortedColumn[] = [...columns];
      const draggedColumn = sortedColumns.splice(source.index, 1)[0];
      sortedColumns.splice(destination.index, 0, draggedColumn);

      const reorderedColumns = sortedColumns.map((column, index) => ({
        ...column,
        order: index,
      }));

      // update board state optimistically (assuming API will change ordering later)
      setBoardState({
        ...boardState,
        columns: reorderedColumns,
      });

      // sync ordering with the server
      const updatedColumnsSet = reorderedColumns.map(({ _id, order }: SortedColumn) => ({
        _id,
        order,
      }));

      await updateColumnsSet({
        body: updatedColumnsSet,
      }).unwrap();

      return;
    }

    // dragged a task within the same column
    if (destination.droppableId === source.droppableId) {
      const affectedColumn = columns.find((column) => column._id === destination.droppableId);

      if (!affectedColumn) {
        // something went wrong
        return;
      }

      // rearrange tasks order
      const sortedTasks: ITask[] = affectedColumn.tasks;
      const draggedTask = sortedTasks.splice(source.index, 1)[0];
      sortedTasks.splice(destination.index, 0, draggedTask);

      const reorderedTasks = sortedTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      // update board state optimistically (assuming API will change ordering later)
      setBoardState({
        ...boardState,
        columns: boardState.columns.map((column) =>
          column._id === affectedColumn._id ? { ...column, tasks: reorderedTasks } : column
        ),
      });

      // sync ordering with the server
      const updatedTasksSet = reorderedTasks.map(({ _id, order, columnId }: ITask) => ({
        _id,
        order,
        columnId,
      }));

      await updateTasksSet({
        body: updatedTasksSet,
      }).unwrap();

      return;
    }

    // dragged a task between columns
    {
      const sourceColumn = columns.find((column) => column._id === source.droppableId);
      const destinationColumn = columns.find((column) => column._id === destination.droppableId);

      if (!sourceColumn || !destinationColumn) {
        // something went wrong
        return;
      }

      // rearrange task order
      const sortedSourceTasks: ITask[] = sourceColumn.tasks;
      const sortedDestinationTasks: ITask[] = destinationColumn.tasks;
      const draggedTask = sortedSourceTasks.splice(source.index, 1)[0];
      sortedDestinationTasks.splice(destination.index, 0, draggedTask);

      const reorderedSourceTasks = sortedSourceTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      const reorderedDestinationTasks = sortedDestinationTasks.map((task, index) => ({
        ...task,
        order: index,
        columnId: destinationColumn._id,
      }));

      // update board state optimistically (assuming API will change ordering later)
      setBoardState({
        ...boardState,
        columns: boardState.columns.map((column) => {
          if (column._id === sourceColumn._id) {
            return { ...column, tasks: reorderedSourceTasks };
          }

          if (column._id === destinationColumn._id) {
            return { ...column, tasks: reorderedDestinationTasks };
          }

          return column;
        }),
      });

      // sync ordering with the server
      const updatedTasksSet = [...reorderedSourceTasks, ...reorderedDestinationTasks].map(
        ({ _id, order, columnId }: ITask) => ({
          _id,
          order,
          columnId,
        })
      );

      await updateTasksSet({
        body: updatedTasksSet,
      }).unwrap();

      return;
    }
  };

  return <DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>;
}
