import React from 'react';
import { useParams } from 'react-router';
import { BoardContextProvider, BoardSortingProvider, Board } from 'components';

export const BoardPage = () => {
  const boardId = useParams()?.id || '';

  return (
    <BoardContextProvider boardId={boardId}>
      <BoardSortingProvider>
        <Board />
      </BoardSortingProvider>
    </BoardContextProvider>
  );
};
