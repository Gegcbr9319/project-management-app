import { byOrder, SortedBoard, SortedColumn } from 'components';
import { IBoard, IColumn, ITask } from 'models';

interface SortedBoardBuilderProps {
  board: IBoard;
  columns: IColumn[];
  tasks: ITask[];
  isBoardLoading: boolean;
  areColumnsLoading: boolean;
}

export const buildSortedBoard = ({
  board,
  columns,
  tasks,
  isBoardLoading,
  areColumnsLoading,
}: SortedBoardBuilderProps): SortedBoard => {
  // Append tasks to each column in board columns
  const sortedColumns = (columns ?? [])
    .map((column) => {
      return Object.defineProperty({ ...column }, 'tasks', {
        enumerable: true,
        value: (tasks ?? []).filter((task) => task.columnId === column._id).sort(byOrder),
      });
    })
    .sort(byOrder) as SortedColumn[];

  // Append sorted columns to the board
  const sortedBoard = Object.defineProperties(
    { ...board },
    {
      columns: {
        enumerable: true,
        value: sortedColumns,
      },
      isBoardLoading: {
        enumerable: true,
        value: isBoardLoading,
      },
      areColumnsLoading: {
        enumerable: true,
        value: areColumnsLoading,
      },
      areTasksLoading: {
        enumerable: true,
        value: areColumnsLoading,
      },
    }
  ) as SortedBoard;

  return sortedBoard;
};
