import { BoardState } from 'components/BoardContextProvider';
import { IBoard, IColumn, ITask } from 'models';
import React, { PropsWithChildren, useContext } from 'react';
import { DropResult, DragDropContext } from 'react-beautiful-dnd';
import { useUpdateTasksSetMutation } from 'store';
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
  const [updateTasksSet] = useUpdateTasksSetMutation();

  const handleDragEnd = async ({ draggableId, source, destination }: DropResult): Promise<void> => {
    // nothing to work with yet
    if (!boardState) {
      return;
    }

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

      const { columns } = boardState;
      const affectedColumn = columns.find((column) => column._id === destination.droppableId);

      // rearrange task order
      const sortedTasks: ITask[] = affectedColumn?.tasks ?? [];
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
          column._id === affectedColumn?._id ? { ...column, tasks: reorderedTasks } : column
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
    }
  };

  return <DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>;
}
