import { SortedBoard } from 'components';
import { Dispatch, SetStateAction, createContext } from 'react';

export type BoardState = [
  SortedBoard | undefined,
  Dispatch<SetStateAction<SortedBoard | undefined>>
];

export const BoardContext = createContext<BoardState | undefined>(undefined);
