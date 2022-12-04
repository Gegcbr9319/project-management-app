import { byOrder, SortedBoard, SortedColumn } from 'components';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  useGetBoardByIdQuery,
  useGetColumnsInBoardQuery,
  useGetTaskSetByBoardIdQuery,
} from 'store';
import { BoardContext } from './BoardContext';
import { buildSortedBoard } from './buildSortedBoard';

interface BoardContextProviderProps extends PropsWithChildren {
  boardId: string;
}

export function BoardContextProvider({
  boardId,
  children,
}: BoardContextProviderProps): JSX.Element {
  const { data: board, isLoading: isBoardLoading } = useGetBoardByIdQuery({ boardId });
  const { data: columns, isLoading: areColumnsLoading } = useGetColumnsInBoardQuery({ boardId });
  const { data: tasks, isLoading: areTasksLoading } = useGetTaskSetByBoardIdQuery({ boardId });

  const [boardState, setBoardState] = useState<SortedBoard | undefined>(undefined);

  // sync board state with the server
  useEffect(() => {
    if (!board) {
      return;
    }

    setBoardState(
      buildSortedBoard({
        board,
        columns: columns ?? [],
        tasks: tasks ?? [],
        isBoardLoading,
        areColumnsLoading,
      })
    );
  }, [board, columns, tasks, isBoardLoading, areColumnsLoading]);

  return (
    <BoardContext.Provider value={[boardState, setBoardState]}>{children}</BoardContext.Provider>
  );
}
